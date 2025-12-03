"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, MessageSquare, Send } from "lucide-react"
import { cn } from "@/lib/utils"

export function ChatWindow({
    selectedContact,
    user,
    messages,
    loadingMessages,
    messagesEndRef,
    newMessage,
    setNewMessage,
    handleSendMessage,
    showAutocomplete,
    setShowAutocomplete
}) {
    const getPartner = (contact) => {
        if (!user || !contact) return null
        return user.id === contact.buyer_id ? contact.seller : contact.buyer
    }

    return (
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
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-950/30 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
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
    )
}
