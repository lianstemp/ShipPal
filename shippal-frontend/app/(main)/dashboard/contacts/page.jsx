"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Search, MessageSquare, User, Building2, Calendar, MoreHorizontal, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"

export default function ContactsPage() {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [userId, setUserId] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedContact, setSelectedContact] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        async function loadContacts() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return
            setUserId(user.id)

            try {
                const { data, error } = await supabase
                    .from('contacts')
                    .select('*, buyer:profiles!buyer_id(*), seller:profiles!seller_id(*)')
                    .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
                    .order('created_at', { ascending: false })

                if (error) throw error
                setContacts(data || [])
            } catch (error) {
                console.error("Error loading contacts:", error)
            } finally {
                setLoading(false)
            }
        }
        loadContacts()
    }, [])

    const filteredContacts = contacts.filter(contact => {
        const partner = contact.buyer_id === userId ? contact.seller : contact.buyer
        const searchLower = searchQuery.toLowerCase()
        return (
            partner?.full_name?.toLowerCase().includes(searchLower) ||
            partner?.company_name?.toLowerCase().includes(searchLower)
        )
    })

    const handleContactClick = (contact) => {
        setSelectedContact(contact)
        setIsModalOpen(true)
    }

    const startChat = () => {
        if (!selectedContact) return
        // Assuming the chat ID logic or just redirecting to messages with partner ID
        // Ideally, we should find an existing conversation or start a new one.
        // For now, let's redirect to messages page.
        // Since the current message page uses ?id=conversation_id, we might need to find it first.
        // But the user request said "Start Chat", so let's just go to messages for now.
        // A better approach: Redirect to /dashboard/messages?partnerId={partner.id} and handle it there.
        // Or if we have the contact ID, maybe that's enough?
        // Let's stick to the requested flow: Modal -> Chat.

        // Finding the partner ID
        const partner = selectedContact.buyer_id === userId ? selectedContact.seller : selectedContact.buyer
        router.push(`/dashboard/messages?contact_id=${partner.id}`)
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Contacts</h1>
                    <p className="text-zinc-400 mt-1">Manage your business relationships and partners.</p>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                        placeholder="Search by name or company..."
                        className="pl-10 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-blue-500/20"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card key={i} className="p-4 bg-zinc-900 border-zinc-800 space-y-4">
                            <div className="flex items-center gap-4">
                                <Skeleton className="w-12 h-12 rounded-full bg-zinc-800" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32 bg-zinc-800" />
                                    <Skeleton className="h-3 w-24 bg-zinc-800" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : filteredContacts.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 border-dashed">
                    <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-zinc-600" />
                    </div>
                    <h3 className="text-lg font-medium text-white">No contacts found</h3>
                    <p className="text-zinc-500 mt-1">Try adjusting your search or find new partners in Matches.</p>
                    <Button variant="outline" className="mt-6 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800" onClick={() => router.push('/dashboard/match')}>
                        Find Partners
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredContacts.map(contact => {
                        const partner = contact.buyer_id === userId ? contact.seller : contact.buyer
                        const role = contact.buyer_id === userId ? "Seller" : "Buyer"

                        return (
                            <Card
                                key={contact.id}
                                className="group p-5 bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all cursor-pointer relative overflow-hidden"
                                onClick={() => handleContactClick(contact)}
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal className="w-5 h-5 text-zinc-500" />
                                </div>

                                <div className="flex items-start gap-4">
                                    <Avatar className="w-14 h-14 border-2 border-zinc-800 group-hover:border-zinc-700 transition-colors">
                                        <AvatarImage src={partner?.avatar_url} />
                                        <AvatarFallback className="bg-zinc-800 text-zinc-400 text-lg">
                                            {partner?.full_name?.[0] || "?"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-white truncate">{partner?.full_name || "Unknown User"}</h3>
                                            <Badge variant="secondary" className="text-[10px] h-5 bg-zinc-800 text-zinc-400 border-zinc-700">
                                                {role}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-zinc-400 mb-1">
                                            <Building2 className="w-3.5 h-3.5" />
                                            <span className="truncate">{partner?.company_name || "No Company"}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>Connected {new Date(contact.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Contact Options</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Choose an action for {selectedContact && (selectedContact.buyer_id === userId ? selectedContact.seller?.full_name : selectedContact.buyer?.full_name)}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedContact && (
                        <div className="flex flex-col items-center py-6 space-y-4">
                            <Avatar className="w-24 h-24 border-4 border-zinc-900 shadow-xl">
                                <AvatarImage src={selectedContact.buyer_id === userId ? selectedContact.seller?.avatar_url : selectedContact.buyer?.avatar_url} />
                                <AvatarFallback className="bg-zinc-800 text-zinc-400 text-3xl">
                                    {(selectedContact.buyer_id === userId ? selectedContact.seller?.full_name : selectedContact.buyer?.full_name)?.[0] || "?"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white">
                                    {selectedContact.buyer_id === userId ? selectedContact.seller?.full_name : selectedContact.buyer?.full_name}
                                </h3>
                                <p className="text-zinc-400">
                                    {selectedContact.buyer_id === userId ? selectedContact.seller?.company_name : selectedContact.buyer?.company_name}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            className="h-12 border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:text-white"
                            onClick={() => {
                                const partner = selectedContact.buyer_id === userId ? selectedContact.seller : selectedContact.buyer
                                if (partner?.id) {
                                    router.push(`/company/${partner.id}`)
                                }
                            }}
                        >
                            <User className="w-4 h-4 mr-2" />
                            View Profile
                        </Button>
                        <Button
                            className="h-12 bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={startChat}
                        >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Start Chat
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
