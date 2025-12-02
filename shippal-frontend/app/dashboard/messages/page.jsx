"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { contactsApi, dealsApi, chatApi } from "@/lib/api"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, Loader2, Package, FileText, Trash2, Pencil, Check, X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MessagesPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const selectedContactId = searchParams.get('id')

    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingMessages, setLoadingMessages] = useState(false)
    const [user, setUser] = useState(null)
    const [newMessage, setNewMessage] = useState("")
    const messagesEndRef = useRef(null)
    const supabase = createClient()

    const [deal, setDeal] = useState(null)
    const [isAddItemsOpen, setIsAddItemsOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(0)
    const [showAutocomplete, setShowAutocomplete] = useState(false)

    const [sealing, setSealing] = useState(false)
    const [editingItemId, setEditingItemId] = useState(null)
    const [editPrice, setEditPrice] = useState(0)

    // Load User and Contacts
    useEffect(() => {
        const loadData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            if (user) {
                try {
                    // Fetch contacts
                    // const data = await contactsApi.getAll(user.id)
                    const { data, error } = await supabase
                        .from('contacts')
                        .select('*, buyer:profiles!buyer_id(*), seller:profiles!seller_id(*)')
                        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)

                    if (error) throw error
                    setContacts(data || [])
                } catch (error) {
                    console.error("Error loading contacts:", error)
                }
            }
            setLoading(false)
        }
        loadData()
    }, [supabase])

    // Load Seller Products when modal opens
    useEffect(() => {
        if (isAddItemsOpen) {
            // Fetch products from the seller of this deal
            const contact = contacts.find(c => c.id === selectedContactId)
            if (contact) {
                const sellerId = contact.seller_id
                supabase.from('products').select('*').eq('seller_id', sellerId).then(({ data }) => {
                    setProducts(data || [])
                })
            }
        }
    }, [isAddItemsOpen, selectedContactId, contacts, supabase])

    // Load Messages and Deal when selectedContactId changes
    useEffect(() => {
        const loadMessagesAndDeal = async (silent = false) => {
            if (!selectedContactId || !user) return

            if (!silent) setLoadingMessages(true)
            try {
                // Load Messages
                // const msgs = await chatApi.getMessages(selectedContactId)
                const { data: msgs, error: msgError } = await supabase
                    .from('messages')
                    .select('*')
                    .eq('contact_id', selectedContactId)
                    .order('created_at', { ascending: true })

                if (msgError) throw msgError
                setMessages(msgs || [])

                // Load Deal (Try to find an active deal for this contact)
                const { data: deals } = await supabase
                    .from('deals')
                    .select('*, items:deal_items(*)')
                    .eq('contact_id', selectedContactId)
                    .order('created_at', { ascending: false })
                    .limit(1)

                if (deals && deals.length > 0) {
                    setDeal(deals[0])
                } else {
                    setDeal(null)
                }

            } catch (error) {
                console.error("Error loading data:", error)
            } finally {
                if (!silent) setLoadingMessages(false)
            }
        }

        loadMessagesAndDeal()

        // Subscribe to new messages
        if (selectedContactId) {
            const channel = supabase
                .channel(`chat:${selectedContactId}`)
                .on('postgres_changes', {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `contact_id=eq.${selectedContactId}`
                }, (payload) => {
                    // Only append if it's not already in the list (to avoid dupes from optimistic update)
                    setMessages(prev => {
                        if (prev.some(m => m.id === payload.new.id)) return prev
                        return [...prev, payload.new]
                    })
                })
                .subscribe()

            return () => {
                supabase.removeChannel(channel)
            }
        }
    }, [selectedContactId, user, supabase])

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!newMessage.trim() || !selectedContactId || !user) return

        const tempContent = newMessage
        setNewMessage("") // Clear input immediately

        // Optimistic Update
        const optimisticMsg = {
            id: `temp-${Date.now()}`,
            contact_id: selectedContactId,
            sender_id: user.id,
            content_original: tempContent,
            created_at: new Date().toISOString(),
            is_ai_generated: false
        }
        setMessages(prev => [...prev, optimisticMsg])

        try {
            const sentMsg = await chatApi.sendMessage(selectedContactId, user.id, tempContent)

            // Replace optimistic message with real one
            // Check if real message already arrived via subscription
            setMessages(prev => {
                if (prev.some(m => m.id === sentMsg.id)) {
                    // Real message already here, just remove optimistic
                    return prev.filter(m => m.id !== optimisticMsg.id)
                }
                // Replace optimistic with real
                return prev.map(m => m.id === optimisticMsg.id ? sentMsg : m)
            })
        } catch (error) {
            console.error("Error sending message:", error)
            setNewMessage(tempContent) // Restore input on error
            setMessages(prev => prev.filter(m => m.id !== optimisticMsg.id)) // Remove optimistic
        }
    }

    const handleSealDeal = async () => {
        if (!deal) return

        setSealing(true)
        try {
            await dealsApi.seal(deal.id)
            // alert("Deal Sealed! AI is generating documents...")
            const { data } = await supabase.from('deals').select('*, items:deal_items(*)').eq('id', deal.id).single()
            setDeal(data)
        } catch (e) {
            console.error("Error sealing deal:", e)
            alert("Failed to seal deal")
        } finally {
            setSealing(false)
        }
    }

    const handleAddItemSubmit = async () => {
        if (!selectedProduct) return

        let currentDeal = deal
        if (!currentDeal) {
            try {
                // Create a new deal (Draft/Negotiating)
                currentDeal = await dealsApi.create(selectedContactId)
                setDeal(currentDeal)
            } catch (error) {
                console.error("Error creating deal:", error)
                alert("Failed to create deal")
                return
            }
        }

        const product = products.find(p => p.id === selectedProduct)
        if (!product) return

        try {
            // Direct Supabase Insert
            const { error } = await supabase.from('deal_items').insert({
                deal_id: currentDeal.id,
                product_id: product.id,
                quantity: parseFloat(quantity),
                price_per_unit: parseFloat(price),
                name: product.name
            })

            if (error) throw error

            setIsAddItemsOpen(false)
            alert("Item added successfully!")
            // Reload deal
            const { data } = await supabase.from('deals').select('*, items:deal_items(*)').eq('id', currentDeal.id).single()
            setDeal(data)
        } catch (error) {
            console.error("Error adding item:", error)
            alert("Failed to add item")
        }
    }

    const handleDeleteItem = async (itemId) => {
        if (!confirm("Are you sure you want to remove this item?")) return
        try {
            const { error } = await supabase.from('deal_items').delete().eq('id', itemId)
            if (error) throw error

            // Reload deal
            const { data } = await supabase.from('deals').select('*, items:deal_items(*)').eq('id', deal.id).single()
            setDeal(data)
        } catch (error) {
            console.error("Error deleting item:", error)
            alert("Failed to delete item")
        }
    }

    const handleUpdatePrice = async (itemId) => {
        try {
            await dealsApi.updateItem(itemId, parseFloat(editPrice))

            // Reload deal
            const { data } = await supabase.from('deals').select('*, items:deal_items(*)').eq('id', deal.id).single()
            setDeal(data)
            setEditingItemId(null)
        } catch (error) {
            console.error("Error updating price:", error)
            alert("Failed to update price")
        }
    }

    const getPartner = (contact) => {
        if (!user || !contact) return null
        // contact object has buyer and seller objects expanded
        return user.id === contact.buyer_id ? contact.seller : contact.buyer
    }

    if (loading) {
        return (
            <div className="max-w-[1600px] mx-auto h-[calc(100vh-2rem)] flex flex-col p-4">
                <div className="mb-6 space-y-2">
                    <Skeleton className="h-8 w-48 bg-zinc-800" />
                    <Skeleton className="h-4 w-64 bg-zinc-800" />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 h-full min-h-0">
                    <Skeleton className="md:col-span-3 h-full bg-zinc-800 rounded-xl" />
                    <Skeleton className="md:col-span-9 h-full bg-zinc-800 rounded-xl" />
                </div>
            </div>
        )
    }

    const selectedContact = contacts.find(c => c.id === selectedContactId)
    const isBuyer = selectedContact && user && user.id === selectedContact.buyer_id
    const isSeller = selectedContact && user && user.id === selectedContact.seller_id

    return (
        <div className="max-w-[1600px] mx-auto h-[calc(100vh-2rem)] flex flex-col p-4">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white">Messages</h1>
                <p className="text-zinc-400">Chat with your connections</p>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 h-full min-h-0">
                {/* Sidebar List */}
                <Card className="md:col-span-3 bg-zinc-900 border-zinc-800 flex flex-col overflow-hidden rounded-2xl shadow-lg">
                    <div className="p-4 border-b border-zinc-800">
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-600 transition-colors"
                        />
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {contacts.length === 0 ? (
                            <div className="text-center py-8 text-zinc-500 text-sm">
                                No contacts yet. Match with someone to start chatting!
                            </div>
                        ) : (
                            contacts.map(contact => {
                                const partner = getPartner(contact)
                                const isActive = contact.id === selectedContactId
                                return (
                                    <div
                                        key={contact.id}
                                        onClick={() => router.push(`/dashboard/messages?id=${contact.id}`)}
                                        className={cn(
                                            "p-3 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-3 group",
                                            isActive ? "bg-blue-600/10 border border-blue-600/20 shadow-sm" : "hover:bg-zinc-800 border border-transparent"
                                        )}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold shrink-0 border border-zinc-700 group-hover:border-zinc-600 transition-colors">
                                            {partner?.full_name?.[0] || "?"}
                                        </div>
                                        <div className="overflow-hidden flex-1">
                                            <h4 className={cn("text-sm font-semibold truncate transition-colors", isActive ? "text-blue-400" : "text-white")}>
                                                {partner?.full_name || "Unknown User"}
                                            </h4>
                                            <p className="text-xs text-zinc-500 truncate group-hover:text-zinc-400 transition-colors">
                                                {partner?.company_name || "Unknown Company"}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </Card>

                {/* Chat Area */}
                <Card className="md:col-span-9 bg-zinc-900 border-zinc-800 flex flex-col overflow-hidden relative rounded-2xl shadow-lg">
                    {selectedContact ? (
                        <div className="flex h-full">
                            <div className="flex-1 flex flex-col min-w-0">
                                {/* Chat Header */}
                                <div className="p-4 border-b border-zinc-800 flex items-center gap-4 bg-zinc-900/50 backdrop-blur-sm z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold border border-zinc-700">
                                            {getPartner(selectedContact)?.full_name?.[0] || "?"}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg leading-none mb-1">
                                                {getPartner(selectedContact)?.full_name || "Unknown User"}
                                            </h3>
                                            <p className="text-xs text-zinc-400 font-medium">
                                                {getPartner(selectedContact)?.company_name || "Unknown Company"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Messages List */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-950/30">
                                    {loadingMessages ? (
                                        <div className="flex justify-center py-4">
                                            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                                        </div>
                                    ) : messages.length === 0 ? (
                                        <div className="text-center py-20">
                                            <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <MessageSquare className="w-8 h-8 text-zinc-600" />
                                            </div>
                                            <p className="text-zinc-500 text-sm font-medium">No messages yet. Start the conversation!</p>
                                        </div>
                                    ) : (
                                        messages.map(msg => {
                                            const isMe = msg.sender_id === user.id
                                            const isAI = msg.is_ai_generated
                                            return (
                                                <div key={msg.id} className={cn("flex w-full", isMe ? "justify-end" : "justify-start")}>
                                                    <div className={cn(
                                                        "max-w-[75%] px-5 py-3 text-sm shadow-sm relative group",
                                                        isMe ? "bg-blue-600 text-white rounded-2xl rounded-tr-sm" :
                                                            isAI ? "bg-purple-900/40 border border-purple-500/30 text-zinc-200 rounded-2xl rounded-tl-sm" :
                                                                "bg-zinc-800 text-zinc-200 rounded-2xl rounded-tl-sm"
                                                    )}>
                                                        {isAI && (
                                                            <div className="flex items-center gap-1.5 mb-1.5 text-purple-400">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                                                <span className="text-[10px] font-bold uppercase tracking-wider">AI Assistant</span>
                                                            </div>
                                                        )}
                                                        <p className="leading-relaxed whitespace-pre-wrap">{msg.content_original}</p>
                                                        <span className={cn(
                                                            "text-[10px] block mt-1.5 text-right font-medium opacity-0 group-hover:opacity-70 transition-opacity",
                                                            isMe ? "text-blue-100" : "text-zinc-500"
                                                        )}>
                                                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <div className="p-4 border-t border-zinc-800 bg-zinc-900">
                                    <form onSubmit={handleSendMessage} className="flex gap-3 relative max-w-4xl mx-auto">
                                        {/* Autocomplete Popup */}
                                        {showAutocomplete && (
                                            <div className="absolute bottom-full left-0 mb-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-2 w-64 animate-in fade-in slide-in-from-bottom-2 z-50">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const words = newMessage.split(" ")
                                                        const lastWord = words[words.length - 1]
                                                        if (lastWord.startsWith("@")) {
                                                            words[words.length - 1] = "@pal "
                                                            setNewMessage(words.join(" "))
                                                        } else {
                                                            setNewMessage(prev => prev + "@pal ")
                                                        }
                                                        setShowAutocomplete(false)
                                                        document.getElementById("message-input")?.focus()
                                                    }}
                                                    className="w-full text-left px-3 py-3 hover:bg-zinc-800 rounded-lg flex items-center gap-3 text-sm text-white transition-colors group"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold shadow-lg group-hover:scale-110 transition-transform">AI</div>
                                                    <div>
                                                        <p className="font-semibold text-purple-400">ShipPal AI</p>
                                                        <p className="text-xs text-zinc-400">@pal - Get help with deals</p>
                                                    </div>
                                                </button>
                                            </div>
                                        )}

                                        <Input
                                            id="message-input"
                                            value={newMessage}
                                            onChange={(e) => {
                                                const val = e.target.value
                                                setNewMessage(val)

                                                // Check for @ trigger
                                                const words = val.split(" ")
                                                const lastWord = words[words.length - 1]
                                                if (lastWord.startsWith("@") && "@pal".startsWith(lastWord)) {
                                                    setShowAutocomplete(true)
                                                } else {
                                                    setShowAutocomplete(false)
                                                }
                                            }}
                                            placeholder="Type a message... (Try @pal for AI assistance)"
                                            className="bg-zinc-950 border-zinc-800 text-white h-12 rounded-xl px-4 focus-visible:ring-blue-600"
                                            autoComplete="off"
                                        />
                                        <Button
                                            type="submit"
                                            disabled={!newMessage.trim()}
                                            className="bg-blue-600 hover:bg-blue-500 h-12 w-12 rounded-xl shrink-0 transition-all hover:scale-105 active:scale-95"
                                        >
                                            <Send className="w-5 h-5" />
                                        </Button>
                                    </form>
                                </div>
                            </div>

                            {/* Deal Sidebar (Right Side) */}
                            <div className="w-80 border-l border-zinc-800 bg-zinc-950/30 p-4 hidden xl:block overflow-y-auto">
                                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-blue-500" />
                                    Deal Room
                                </h3>

                                {/* Deal Status */}
                                <div className="mb-6 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50 backdrop-blur-sm">
                                    <h4 className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-2">Current Status</h4>
                                    <div className="flex items-center gap-2">
                                        <div className={cn("w-2 h-2 rounded-full", deal?.status === 'completed' ? "bg-green-500" : "bg-blue-500 animate-pulse")} />
                                        <span className={cn("font-bold uppercase tracking-wide text-sm", deal?.status === 'completed' ? "text-green-500" : "text-blue-500")}>
                                            {deal?.status?.replace('_', ' ') || "Negotiating"}
                                        </span>
                                    </div>
                                </div>

                                {/* Deal Items */}
                                {deal && deal.items && deal.items.length > 0 && (
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Items</h4>
                                            <span className="text-[10px] text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">{deal.items.length}</span>
                                        </div>
                                        <div className="space-y-2">
                                            {deal.items.map((item, i) => (
                                                <div key={i} className="bg-zinc-900/80 p-3 rounded-xl border border-zinc-800 text-sm hover:border-zinc-700 transition-colors group">
                                                    <div className="flex justify-between font-medium text-white mb-1">
                                                        <span className="line-clamp-1">{item.name}</span>
                                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {/* Delete Item - Only for Buyer */}
                                                            {deal.status === 'negotiating' && isBuyer && (
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        handleDeleteItem(item.id)
                                                                    }}
                                                                    className="text-zinc-500 hover:text-red-500 transition-colors p-1 hover:bg-red-500/10 rounded"
                                                                >
                                                                    <Trash2 className="w-3 h-3" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Price and Quantity */}
                                                    <div className="flex justify-between items-center text-zinc-500 text-xs mt-2">
                                                        <span className="bg-zinc-950 px-1.5 py-0.5 rounded text-zinc-400">Qty: {item.quantity}</span>

                                                        {/* Price Negotiation for Seller */}
                                                        {editingItemId === item.id ? (
                                                            <div className="flex items-center gap-1">
                                                                <Input
                                                                    type="number"
                                                                    value={editPrice}
                                                                    onChange={e => setEditPrice(e.target.value)}
                                                                    className="w-16 h-6 text-xs p-1 bg-zinc-950 border-zinc-700"
                                                                />
                                                                <button onClick={() => handleUpdatePrice(item.id)} className="text-green-500 hover:text-green-400"><Check className="w-3 h-3" /></button>
                                                                <button onClick={() => setEditingItemId(null)} className="text-red-500 hover:text-red-400"><X className="w-3 h-3" /></button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-1">
                                                                <span>${item.price_per_unit}</span>
                                                                {deal.status === 'negotiating' && isSeller && (
                                                                    <button
                                                                        onClick={() => {
                                                                            setEditingItemId(item.id)
                                                                            setEditPrice(item.price_per_unit)
                                                                        }}
                                                                        className="text-zinc-500 hover:text-blue-400"
                                                                    >
                                                                        <Pencil className="w-3 h-3" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-right text-xs text-zinc-400 mt-2 pt-2 border-t border-zinc-800/50">
                                                        Total: <span className="text-white font-medium">${(item.quantity * item.price_per_unit).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="pt-4 mt-4 border-t border-zinc-800 flex justify-between items-end">
                                                <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Total Amount</span>
                                                <span className="text-xl font-bold text-white">${deal.total_amount?.toLocaleString() || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="space-y-3 mt-auto">
                                    {deal && (
                                        <Button
                                            variant="secondary"
                                            className="w-full justify-start text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 h-10 rounded-xl"
                                            onClick={() => router.push(`/dashboard/deals/${deal.id}`)}
                                        >
                                            <FileText className="w-4 h-4 mr-2" />
                                            View Full Deal Details
                                        </Button>
                                    )}

                                    {/* Add Items - Only for Buyer */}
                                    {isBuyer && (
                                        <Dialog open={isAddItemsOpen} onOpenChange={setIsAddItemsOpen}>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="w-full justify-start border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed h-10 rounded-xl"
                                                    disabled={deal && deal.status !== 'negotiating'}
                                                >
                                                    <Package className="w-4 h-4 mr-2" />
                                                    Add Items
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:rounded-2xl">
                                                <DialogHeader>
                                                    <DialogTitle>Add Item to Deal</DialogTitle>
                                                </DialogHeader>
                                                <div className="space-y-4 py-4">
                                                    <div className="space-y-2">
                                                        <Label>Product</Label>
                                                        <Select onValueChange={(val) => {
                                                            setSelectedProduct(val)
                                                            const p = products.find(prod => prod.id === val)
                                                            if (p) setPrice(p.price_per_unit || 0)
                                                        }}>
                                                            <SelectTrigger className="bg-zinc-950 border-zinc-800 rounded-xl h-10">
                                                                <SelectValue placeholder="Select a product" />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white rounded-xl">
                                                                {products.map(p => (
                                                                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label>Quantity</Label>
                                                            <Input
                                                                type="number"
                                                                value={quantity}
                                                                onChange={e => setQuantity(e.target.value)}
                                                                className="bg-zinc-950 border-zinc-800 rounded-xl h-10"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Price per Unit</Label>
                                                            <Input
                                                                type="number"
                                                                value={price}
                                                                readOnly // Fixed price for buyer
                                                                className="bg-zinc-950 border-zinc-800 opacity-70 cursor-not-allowed rounded-xl h-10"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button onClick={handleAddItemSubmit} className="bg-blue-600 hover:bg-blue-500 rounded-xl">Add Item</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    )}

                                    {/* Seal Deal - Only for Buyer */}
                                    {isBuyer && (
                                        <Button
                                            onClick={handleSealDeal}
                                            className="w-full bg-green-600 hover:bg-green-500 text-white disabled:opacity-50 disabled:cursor-not-allowed h-10 rounded-xl font-medium shadow-lg shadow-green-900/20"
                                            disabled={!deal || deal.status !== 'negotiating' || !deal.items || deal.items.length === 0 || sealing}
                                        >
                                            {sealing ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Sealing...
                                                </>
                                            ) : (
                                                <>
                                                    <FileText className="w-4 h-4 mr-2" />
                                                    {deal && deal.status !== 'negotiating' ? 'Deal Sealed' : 'Seal Deal'}
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <div className="w-20 h-20 bg-zinc-800/50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <MessageSquare className="w-10 h-10 text-zinc-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Select a contact</h3>
                            <p className="text-zinc-400 max-w-sm leading-relaxed">
                                Choose a contact from the left sidebar to start chatting and managing your deals.
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}
