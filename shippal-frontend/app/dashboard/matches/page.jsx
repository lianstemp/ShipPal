"use client"

import { useEffect, useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { matchesApi } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, TrendingUp, MessageSquare, ExternalLink } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function MatchesPage() {
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const supabase = createClient()

    const userRef = useRef(null)



    useEffect(() => {
        let channel = null

        const loadMatches = async () => {
            try {
                const { data: { user: currentUser } } = await supabase.auth.getUser()
                setUser(currentUser)
                userRef.current = currentUser

                if (currentUser) {
                    const data = await matchesApi.getAll(currentUser.id)
                    setMatches(data)

                    // Subscribe to match updates
                    channel = supabase
                        .channel('matches-updates')
                        .on('postgres_changes', {
                            event: 'UPDATE',
                            schema: 'public',
                            table: 'matches',
                            filter: `buyer_id=eq.${currentUser.id}`
                        }, (payload) => handleMatchUpdate(payload, currentUser))
                        .on('postgres_changes', {
                            event: 'UPDATE',
                            schema: 'public',
                            table: 'matches',
                            filter: `seller_id=eq.${currentUser.id}`
                        }, (payload) => handleMatchUpdate(payload, currentUser))
                        .subscribe()
                }
            } catch (error) {
                console.error("Error loading matches:", error)
            } finally {
                setLoading(false)
            }
        }

        loadMatches()

        return () => {
            if (channel) {
                supabase.removeChannel(channel)
            }
        }
    }, [supabase])

    const handleMatchUpdate = async (payload, currentUser) => {
        const { new: newRecord, old: oldRecord } = payload
        const userToUse = currentUser || userRef.current

        // Refresh matches list
        if (userToUse) {
            const data = await matchesApi.getAll(userToUse.id)
            setMatches(data)
        }
    }

    const handleStatusUpdate = async (id, status) => {
        try {
            const updatedMatch = await matchesApi.updateStatus(id, status)
            // Refresh matches
            const data = await matchesApi.getAll(user.id)
            setMatches(data)
        } catch (error) {
            console.error("Error updating match status:", error)
        }
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 space-y-2">
                    <Skeleton className="h-8 w-48 bg-zinc-800" />
                    <Skeleton className="h-4 w-64 bg-zinc-800" />
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-10 w-full max-w-md bg-zinc-800" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-64 bg-zinc-800 rounded-xl" />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const role = user?.user_metadata?.role || "buyer"

    // Filter matches
    const activeMatches = matches.filter(m => m.status === 'matched')
    const pendingMatches = matches.filter(m => m.status === 'pending')

    const MatchCard = ({ match, isPending = false }) => {
        const isBuyer = role === "buyer"
        const item = match.product || match.request

        const getProfile = (p) => {
            if (!p) return null
            if (Array.isArray(p)) return p[0]
            return p
        }

        const partner = isBuyer ? getProfile(match.seller) : getProfile(match.buyer)

        // Determine if I am the one who needs to approve
        // If I am Buyer, and I swiped Product (Right) -> I initiated. Seller needs to approve.
        // If I am Seller, and I swiped Request (Right) -> I initiated. Buyer needs to approve.
        // Wait, the current logic in swipes.js:
        // Buyer swipes Product -> Match created with buyer_id=me, seller_id=product.seller
        // Seller swipes Request -> Match created with seller_id=me, buyer_id=request.buyer

        // So if I am the "initiator", I am waiting.
        // If I am the "receiver", I need to approve.

        // How do we know who initiated?
        // We don't track "initiator_id" in matches table explicitly, but we can infer or add it.
        // For now, let's assume:
        // If I am Buyer, and match.product_id exists -> I initiated (swiped product).
        // If I am Seller, and match.request_id exists -> I initiated (swiped request).
        // This is a bit shaky if both exist (future double swipe).

        // Better logic:
        // Let's assume for this hackathon:
        // If I am Buyer, and it's a Product match -> I initiated.
        // If I am Seller, and it's a Request match -> I initiated.

        // Actually, let's look at `swipes` table? No, too complex join.
        // Let's just show "Accept/Reject" for everyone for now to be safe, 
        // OR:
        // If I am Buyer, and match.product_id is NOT null -> I matched a product. I am the initiator.
        // If I am Seller, and match.request_id is NOT null -> I matched a request. I am the initiator.

        // Wait, if I am Buyer, I swipe a Product. The Seller receives a "Request".
        // So Seller should see "Accept/Reject". Buyer should see "Waiting".

        const isInitiator = (isBuyer && match.product_id) || (!isBuyer && match.request_id)

        return (
            <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-lg font-bold text-zinc-400">
                            {partner?.full_name?.[0] || "?"}
                        </div>
                        <div>
                            <h3 className="font-bold text-white">{partner?.full_name || "Unknown User"}</h3>
                            <p className="text-sm text-zinc-400">
                                {partner?.company_name || (partner?.role === 'buyer' ? "Individual Buyer" : "Unknown Company")}
                            </p>
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

                    {isPending ? (
                        <div className="flex gap-2">
                            {isInitiator ? (
                                <Button disabled className="w-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                                    Waiting for approval
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        onClick={() => handleStatusUpdate(match.id, 'matched')}
                                        className="flex-1 bg-green-600 hover:bg-green-500 text-white"
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        onClick={() => handleStatusUpdate(match.id, 'rejected')}
                                        variant="outline"
                                        className="flex-1 border-red-900 text-red-500 hover:bg-red-900/20"
                                    >
                                        Reject
                                    </Button>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link href={`/dashboard/messages?id=${match.id}`} className="flex-1">
                                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Chat
                                </Button>
                            </Link>
                            {partner && (
                                <Link href={`/dashboard/company/${partner.id}`}>
                                    <Button variant="outline" size="icon" className="border-zinc-700 text-zinc-400 hover:text-white">
                                        <ExternalLink className="w-4 h-4" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Matches</h1>
                <p className="text-zinc-400">Your connected opportunities</p>
            </div>

            <Tabs defaultValue="active" className="w-full">
                <TabsList className="bg-zinc-900 border-zinc-800 mb-6">
                    <TabsTrigger value="active">Active Matches ({activeMatches.length})</TabsTrigger>
                    <TabsTrigger value="requests">Requests ({pendingMatches.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="active">
                    {activeMatches.length === 0 ? (
                        <div className="text-center py-20 bg-zinc-900/50 rounded-xl border border-zinc-800">
                            <TrendingUp className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-white mb-2">No active matches</h3>
                            <p className="text-zinc-400 mb-6">
                                Check your requests or go to Matchmaking.
                            </p>
                            <Link href="/dashboard/match">
                                <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                                    Start Matching
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activeMatches.map(match => (
                                <MatchCard key={match.id} match={match} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="requests">
                    {pendingMatches.length === 0 ? (
                        <div className="text-center py-20 bg-zinc-900/50 rounded-xl border border-zinc-800">
                            <MessageSquare className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-white mb-2">No pending requests</h3>
                            <p className="text-zinc-400">
                                New matches will appear here for your approval.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pendingMatches.map(match => (
                                <MatchCard key={match.id} match={match} isPending={true} />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}
