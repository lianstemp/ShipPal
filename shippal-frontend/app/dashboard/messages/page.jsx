"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { chatApi, dealsApi } from "@/lib/api"
import { Card } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { ContactList } from "@/components/messages/contact-list"
import { ChatWindow } from "@/components/messages/chat-window"
import { DealPanel } from "@/components/messages/deal-panel"
import { toast } from "sonner"

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
    const [isAddingItem, setIsAddingItem] = useState(false)

    // Load User and Contacts
    useEffect(() => {
        const loadData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            if (user) {
                try {
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
                const { data: msgs, error: msgError } = await supabase
                    .from('messages')
                    .select('*')
                    .eq('contact_id', selectedContactId)
                    .order('created_at', { ascending: true })

                if (msgError) throw msgError
                setMessages(msgs || [])

                // Load Deal
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

    // Subscribe to Deal Updates
    useEffect(() => {
        if (!selectedContactId) return

        const channel = supabase
            .channel(`deals:${selectedContactId}`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'deals',
                filter: `contact_id=eq.${selectedContactId}`
            }, async (payload) => {
                if (payload.eventType === 'DELETE') {
                    setDeal(null)
                } else {
                    const { data } = await supabase.from('deals').select('*, items:deal_items(*)').eq('id', payload.new.id).single()
                    setDeal(data)
                }
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [selectedContactId, supabase])

    // Subscribe to Deal Items Updates
    useEffect(() => {
        if (!deal) return

        const channel = supabase
            .channel(`deal_items:${deal.id}`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'deal_items',
                filter: `deal_id=eq.${deal.id}`
            }, async () => {
                const { data } = await supabase.from('deals').select('*, items:deal_items(*)').eq('id', deal.id).single()
                setDeal(data)
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [deal?.id, supabase])

    // Scroll to bottom
    useEffect(() => {
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
        }
        scrollToBottom()
        const timeout = setTimeout(scrollToBottom, 100)
        return () => clearTimeout(timeout)
    }, [messages.length, selectedContactId])

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!newMessage.trim() || !selectedContactId || !user) return

        const tempContent = newMessage
        setNewMessage("")

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
            setMessages(prev => {
                if (prev.some(m => m.id === sentMsg.id)) {
                    return prev.filter(m => m.id !== optimisticMsg.id)
                }
                return prev.map(m => m.id === optimisticMsg.id ? sentMsg : m)
            })
        } catch (error) {
            console.error("Error sending message:", error)
            setNewMessage(tempContent)
            setMessages(prev => prev.filter(m => m.id !== optimisticMsg.id))
            toast.error("Failed to send message")
        }
    }

    const handleSealDeal = async () => {
        if (!deal) return

        setSealing(true)
        try {
            await dealsApi.seal(deal.id)
            const { data } = await supabase.from('deals').select('*, items:deal_items(*)').eq('id', deal.id).single()
            setDeal(data)
        } catch (e) {
            console.error("Error sealing deal:", e)
            setSealing(false)
        }
        setTimeout(() => setSealing(false), 2000)
    }

    const handleAddItemSubmit = async () => {
        if (!selectedProduct) return

        let currentDeal = deal
        if (!currentDeal) {
            try {
                const { data: newDeal, error: createError } = await supabase
                    .from('deals')
                    .insert({ contact_id: selectedContactId, status: 'negotiating' })
                    .select()
                    .single()

                if (createError) throw createError
                currentDeal = newDeal
                setDeal(currentDeal)
            } catch (error) {
                console.error("Error creating deal:", error)
                toast.error("Failed to create deal")
                return
            }
        }

        const product = products.find(p => p.id === selectedProduct)
        if (!product) return

        try {
            setIsAddingItem(true)
            const { error } = await supabase.from('deal_items').insert({
                deal_id: currentDeal.id,
                product_id: product.id,
                quantity: parseFloat(quantity),
                price_per_unit: parseFloat(price),
                name: product.name
            })

            if (error) throw error

            setIsAddItemsOpen(false)
            toast.success("Item added successfully")
            const { data } = await supabase.from('deals').select('*, items:deal_items(*)').eq('id', currentDeal.id).single()
            setDeal(data)
        } catch (error) {
            console.error("Error adding item:", error)
            toast.error("Failed to add item")
        } finally {
            setIsAddingItem(false)
        }
    }

    const handleDeleteItem = async (itemId) => {
        if (!confirm("Are you sure you want to remove this item?")) return
        try {
            const { error } = await supabase.from('deal_items').delete().eq('id', itemId)
            if (error) throw error

            const { data } = await supabase.from('deals').select('*, items:deal_items(*)').eq('id', deal.id).single()
            setDeal(data)
        } catch (error) {
            console.error("Error deleting item:", error)
            toast.error("Failed to delete item")
        }
    }

    const handleUpdatePrice = async (itemId) => {
        try {
            const { error } = await supabase
                .from('deal_items')
                .update({ price_per_unit: parseFloat(editPrice) })
                .eq('id', itemId)

            if (error) throw error

            const { data } = await supabase.from('deals').select('*, items:deal_items(*)').eq('id', deal.id).single()
            setDeal(data)
            setEditingItemId(null)
        } catch (error) {
            console.error("Error updating price:", error)
            toast.error("Failed to update price")
        }
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
                <h1 className="text-3xl font-bold text-white">Deal Room</h1>
                <p className="text-zinc-400">Chat with your connections</p>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 h-full min-h-0">
                <ContactList
                    contacts={contacts}
                    selectedContactId={selectedContactId}
                    user={user}
                />

                <Card className="md:col-span-9 bg-zinc-900 border-zinc-800 flex flex-col overflow-hidden relative rounded-2xl shadow-lg">
                    {selectedContact ? (
                        <div className="flex h-full">
                            <ChatWindow
                                selectedContact={selectedContact}
                                user={user}
                                messages={messages}
                                loadingMessages={loadingMessages}
                                messagesEndRef={messagesEndRef}
                                newMessage={newMessage}
                                setNewMessage={setNewMessage}
                                handleSendMessage={handleSendMessage}
                                showAutocomplete={showAutocomplete}
                                setShowAutocomplete={setShowAutocomplete}
                            />

                            <DealPanel
                                deal={deal}
                                isBuyer={isBuyer}
                                isSeller={isSeller}
                                router={router}
                                handleSealDeal={handleSealDeal}
                                sealing={sealing}
                                handleDeleteItem={handleDeleteItem}
                                handleUpdatePrice={handleUpdatePrice}
                                editingItemId={editingItemId}
                                setEditingItemId={setEditingItemId}
                                editPrice={editPrice}
                                setEditPrice={setEditPrice}
                                isAddItemsOpen={isAddItemsOpen}
                                setIsAddItemsOpen={setIsAddItemsOpen}
                                products={products}
                                selectedProduct={selectedProduct}
                                setSelectedProduct={setSelectedProduct}
                                quantity={quantity}
                                setQuantity={setQuantity}
                                price={price}
                                setPrice={setPrice}
                                handleAddItemSubmit={handleAddItemSubmit}
                                isAddingItem={isAddingItem}
                            />
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
