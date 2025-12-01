"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export default function MessagesPage() {
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
                    <div className="flex-1 overflow-y-auto p-2">
                        <div className="text-center py-8 text-zinc-500 text-sm">
                            No active conversations
                        </div>
                    </div>
                </Card>

                {/* Chat Area */}
                <Card className="md:col-span-2 bg-zinc-900 border-zinc-800 flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                        <MessageSquare className="w-8 h-8 text-zinc-500" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">Select a conversation</h3>
                    <p className="text-zinc-400 max-w-sm">
                        Choose a match from the left to start chatting or go to Matches to find new connections.
                    </p>
                </Card>
            </div>
        </div>
    )
}
