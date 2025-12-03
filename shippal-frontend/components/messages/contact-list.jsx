"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function ContactList({ contacts, selectedContactId, user }) {
    const router = useRouter()

    const getPartner = (contact) => {
        if (!user || !contact) return null
        return user.id === contact.buyer_id ? contact.seller : contact.buyer
    }

    return (
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
    )
}
