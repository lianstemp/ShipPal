"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { matchesApi } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, TrendingUp, MessageSquare, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function MatchesPage() {
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const supabase = createClient()

    useEffect(() => {
        const loadMatches = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            if (user) {
                try {
                    const data = await matchesApi.getAll(user.id)
                    setMatches(data)
                } catch (error) {
                    console.error("Error loading matches:", error)
                }
            }
            setLoading(false)
        }
        loadMatches()
    }, [supabase])

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        )
    }

    const role = user?.user_metadata?.role || "buyer"

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Matches</h1>
                <p className="text-zinc-400">Your connected opportunities</p>
            </div>

            {matches.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <TrendingUp className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No matches yet</h3>
                    <p className="text-zinc-400 mb-6">
                        Go to Matchmaking to find potential partners.
                    </p>
                    <Link href="/dashboard/match">
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                            Start Matching
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matches.map((match) => {
                        // Determine what to show based on role
                        // If I'm buyer, show Product info and Seller info
                        // If I'm seller, show Request info and Buyer info
                        const isBuyer = role === "buyer"
                        const item = isBuyer ? match.products : match.requests
                        const partner = isBuyer ? match.products?.profiles : match.requests?.profiles

                        return (
                            <Card key={match.id} className="bg-zinc-900 border-zinc-800 overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-lg font-bold text-zinc-400">
                                            {partner?.full_name?.[0] || "?"}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">{partner?.full_name || "Unknown User"}</h3>
                                            <p className="text-sm text-zinc-400">{partner?.company_name || "Unknown Company"}</p>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-zinc-950/50 rounded-lg border border-zinc-800 mb-4">
                                        <h4 className="font-medium text-zinc-300 mb-1">
                                            Matched on: {item?.name || item?.title || "Item"}
                                        </h4>
                                        <p className="text-xs text-zinc-500 line-clamp-2">
                                            {item?.description}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link href={`/dashboard/messages/${match.id}`} className="flex-1">
                                            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                                                <MessageSquare className="w-4 h-4 mr-2" />
                                                Chat
                                            </Button>
                                        </Link>
                                        <Button variant="outline" size="icon" className="border-zinc-700 text-zinc-400 hover:text-white">
                                            <ExternalLink className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
