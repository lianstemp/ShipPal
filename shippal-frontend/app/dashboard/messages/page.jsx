"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { matchesApi, messagesApi } from "@/lib/api"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MessagesPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const selectedMatchId = searchParams.get('id')

    const [matches, setMatches] = useState([])
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingMessages, setLoadingMessages] = useState(false)
    const [user, setUser] = useState(null)
    const [newMessage, setNewMessage] = useState("")
    const messagesEndRef = useRef(null)
    const supabase = createClient()

    // Load User and Matches
    useEffect(() => {
        const loadData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            if (user) {
                try {
                    // Fetch only active matches
                    const allMatches = await matchesApi.getAll(user.id)
                    const active = allMatches.filter(m => m.status === 'matched')
                    setMatches(active)
                } catch (error) {
                    console.error("Error loading matches:", error)
                }
            }
            setLoading(false)
        }
        loadData()
    }, [supabase])

    // Load Messages when selectedMatchId changes
    useEffect(() => {
        const loadMessages = async () => {
            if (!selectedMatchId || !user) return

            setLoadingMessages(true)
            try {
                const data = await messagesApi.getByMatchId(selectedMatchId)
                setMessages(data)
            } catch (error) {
                console.error("Error loading messages:", error)
            } finally {
                setLoadingMessages(false)
            }
        }

        loadMessages()

        // Subscribe to new messages
        if (selectedMatchId) {
            const channel = messagesApi.subscribe(selectedMatchId, (payload) => {
                // Fetch the new message with sender details (or just append if we trust the payload)
                // Payload doesn't have the join, so simpler to just re-fetch or optimistically add if we had sender info.
                // For now, let's just re-fetch to be safe and get the join
                loadMessages()
            })

            return () => {
                supabase.removeChannel(channel)
            }
        }
    }, [selectedMatchId, user, supabase])

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!newMessage.trim() || !selectedMatchId || !user) return

        try {
            await messagesApi.send(selectedMatchId, user.id, newMessage)
            setNewMessage("")
            // Message will be added via subscription
        } catch (error) {
            console.error("Error sending message:", error)
        }
    }

    const getPartner = (match) => {
        if (!user) return null
        const role = user.user_metadata?.role || "buyer"
        const isBuyer = role === "buyer"

        const getProfile = (p) => {
            if (!p) return null
            if (Array.isArray(p)) return p[0]
            return p
        }

        return isBuyer ? getProfile(match.seller) : getProfile(match.buyer)
    }

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        )
    }

    const selectedMatch = matches.find(m => m.id === selectedMatchId)

    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-100px)] flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white">Messages</h1>
                <p className="text-zinc-400">Chat with your connections</p>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-0">
                {/* Sidebar List */}
                <Card className="bg-zinc-900 border-zinc-800 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-zinc-800">
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-600"
                        />
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {matches.length === 0 ? (
                            <div className="text-center py-8 text-zinc-500 text-sm">
                                No active conversations
                            </div>
                        ) : (
                            matches.map(match => {
                                const partner = getPartner(match)
                                const isActive = match.id === selectedMatchId
                                return (
                                    <div
                                        key={match.id}
                                        onClick={() => router.push(`/dashboard/messages?id=${match.id}`)}
                                        className={cn(
                                            "p-3 rounded-lg cursor-pointer transition-colors flex items-center gap-3",
                                            isActive ? "bg-blue-900/20 border border-blue-900/50" : "hover:bg-zinc-800"
                                        )}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold">
                                            {partner?.full_name?.[0] || "?"}
                                        </div>
                                        <div className="overflow-hidden">
                                            <h4 className="text-sm font-medium text-white truncate">
                                                {partner?.full_name || "Unknown User"}
                                            </h4>
                                            <p className="text-xs text-zinc-500 truncate">
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
                <Card className="md:col-span-2 bg-zinc-900 border-zinc-800 flex flex-col overflow-hidden">
                    {selectedMatch ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold">
                                    {getPartner(selectedMatch)?.full_name?.[0] || "?"}
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">
                                        {getPartner(selectedMatch)?.full_name || "Unknown User"}
                                    </h3>
                                    <p className="text-xs text-zinc-400">
                                        {getPartner(selectedMatch)?.company_name || "Unknown Company"}
                                    </p>
                                </div>
                            </div>

                            {/* Messages List */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {loadingMessages ? (
                                    <div className="flex justify-center py-4">
                                        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div className="text-center py-10 text-zinc-500 text-sm">
                                        No messages yet. Start the conversation!
                                    </div>
                                ) : (
                                    messages.map(msg => {
                                        const isMe = msg.sender_id === user.id
                                        return (
                                            <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                                                <div className={cn(
                                                    "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                                                    isMe ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-200"
                                                )}>
                                                    <p>{msg.content_original}</p>
                                                    <span className="text-[10px] opacity-70 block mt-1 text-right">
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
                            <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-800 flex gap-2">
                                <Input
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="bg-zinc-950 border-zinc-800 text-white"
                                />
                                <Button type="submit" disabled={!newMessage.trim()} className="bg-blue-600 hover:bg-blue-500">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                                <MessageSquare className="w-8 h-8 text-zinc-500" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">Select a conversation</h3>
                            <p className="text-zinc-400 max-w-sm">
                                Choose a match from the left to start chatting.
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}
