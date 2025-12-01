"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { productsApi, requestsApi, swipesApi, matchesApi } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, X, Heart, MapPin, Building2, Package } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { MatchDialog } from "@/components/match-dialog"

export default function MatchPage() {
    const [user, setUser] = useState(null)
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [matchAnimation, setMatchAnimation] = useState(null)
    const supabase = createClient()

    useEffect(() => {
        const loadData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)

            if (user) {
                const role = user.user_metadata?.role || "buyer"
                try {
                    // 1. Fetch Incoming Likes (Pending Matches)
                    const pendingMatches = await matchesApi.getPendingIncoming(user.id, role)

                    // Transform pending matches into swipeable items
                    const incomingItems = pendingMatches.map(m => {
                        // If I am Buyer, I see Seller. If I am Seller, I see Buyer.
                        const partner = role === 'buyer'
                            ? (Array.isArray(m.seller) ? m.seller[0] : m.seller)
                            : (Array.isArray(m.buyer) ? m.buyer[0] : m.buyer)

                        return {
                            id: m.id, // Use match ID as item ID for incoming
                            isIncoming: true,
                            matchData: m,
                            // Construct a profile-like object
                            name: partner.full_name,
                            description: role === 'buyer'
                                ? `Liked your request: ${m.request?.title}`
                                : `Liked your product: ${m.product?.name}`,
                            image_url: partner.avatar_url,
                            profiles: partner,
                            tags: ['Incoming Request']
                        }
                    })

                    // 2. Fetch Regular Unswiped Items
                    let regularItems = []
                    if (role === "buyer") {
                        regularItems = await productsApi.getUnswiped(user.id)
                    } else {
                        regularItems = await requestsApi.getUnswiped(user.id)
                    }

                    // Combine: Incoming first
                    setItems([...incomingItems, ...(regularItems || [])])
                } catch (error) {
                    console.error("Error loading items:", error)
                }
            }
            setLoading(false)
        }
        loadData()
    }, [supabase])

    const handleSwipe = async (direction, item) => {
        // Remove item from list immediately
        setItems(prev => prev.filter(i => i.id !== item.id))

        try {
            if (item.isIncoming) {
                // Handle Incoming Match Response
                const status = direction === 'right' ? 'matched' : 'rejected'
                await matchesApi.updateStatus(item.matchData.id, status)

                if (status === 'matched') {
                    // Show celebration
                    setMatchAnimation({
                        match: item.matchData,
                        partner: item.profiles
                    })
                }
            } else {
                // Handle Regular Swipe
                const targetType = user.user_metadata?.role === "buyer" ? "product" : "request"
                const match = await swipesApi.swipe(item.id, targetType, direction)

                if (match && match.status === 'matched') {
                    const partner = Array.isArray(item.profiles) ? item.profiles[0] : item.profiles
                    setMatchAnimation({ match, partner })
                }
            }
        } catch (error) {
            console.error("Error swiping:", error)
        }
    }

    if (loading) {
        return (
            <div className="h-[85vh] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="relative w-full max-w-md h-[600px]">
                    <Skeleton className="h-full w-full rounded-xl bg-zinc-800" />
                </div>
                <div className="flex gap-6 mt-8">
                    <Skeleton className="w-16 h-16 rounded-full bg-zinc-800" />
                    <Skeleton className="w-16 h-16 rounded-full bg-zinc-800" />
                </div>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] text-center">
                <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Package className="w-10 h-10 text-zinc-600" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">No more profiles</h2>
                <p className="text-zinc-400 max-w-md">
                    You've seen all available {user?.user_metadata?.role === "buyer" ? "products" : "requests"} for now. Check back later!
                </p>
            </div>
        )
    }

    return (
        <div className="h-[85vh] flex flex-col items-center justify-center relative overflow-hidden">
            <MatchDialog
                isOpen={!!matchAnimation}
                onClose={() => setMatchAnimation(null)}
                match={matchAnimation?.match}
                partner={matchAnimation?.partner}
            />

            <div className="relative w-full max-w-md h-[600px]">
                <AnimatePresence>
                    {items.map((item, index) => (
                        index === 0 && (
                            <SwipeCard
                                key={item.id}
                                item={item}
                                onSwipe={(dir) => handleSwipe(dir, item)}
                            />
                        )
                    ))}
                </AnimatePresence>
            </div>

            <div className="flex gap-6 mt-8">
                <Button
                    size="icon"
                    className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 text-red-500 hover:bg-red-500/10 hover:border-red-500 transition-all shadow-xl"
                    onClick={() => handleSwipe('left', items[0])}
                >
                    <X className="w-8 h-8" />
                </Button>
                <Button
                    size="icon"
                    className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 text-green-500 hover:bg-green-500/10 hover:border-green-500 transition-all shadow-xl"
                    onClick={() => handleSwipe('right', items[0])}
                >
                    <Heart className="w-8 h-8 fill-current" />
                </Button>
            </div>
        </div>
    )
}

function SwipeCard({ item, onSwipe }) {
    const x = useMotionValue(0)
    const rotate = useTransform(x, [-200, 200], [-15, 15])
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

    const likeOpacity = useTransform(x, [0, 100], [0, 1])
    const nopeOpacity = useTransform(x, [-100, 0], [1, 0])

    const handleDragEnd = (event, info) => {
        if (info.offset.x > 100) {
            onSwipe('right')
        } else if (info.offset.x < -100) {
            onSwipe('left')
        }
    }

    const getProfile = (item) => {
        if (!item.profiles) return null
        if (Array.isArray(item.profiles)) {
            return item.profiles[0] || null
        }
        return item.profiles
    }

    const profile = getProfile(item)

    return (
        <motion.div
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.2 } }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
            <Card className="h-full w-full overflow-hidden bg-zinc-900 border-zinc-800 shadow-2xl relative">
                <div className="h-2/3 bg-zinc-800 relative">
                    {/* Incoming Badge */}
                    {item.isIncoming && (
                        <div className="absolute top-4 left-0 right-0 flex justify-center z-20">
                            <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce">
                                Liked You!
                            </div>
                        </div>
                    )}

                    <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 border-4 border-green-500 rounded-lg px-4 py-2 -rotate-12 z-10">
                        <span className="text-4xl font-bold text-green-500 uppercase">Like</span>
                    </motion.div>
                    <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 border-4 border-red-500 rounded-lg px-4 py-2 rotate-12 z-10">
                        <span className="text-4xl font-bold text-red-500 uppercase">Nope</span>
                    </motion.div>

                    {(item.images && item.images.length > 0) ? (
                        <img src={item.images[0]} alt={item.name || item.title} className="w-full h-full object-cover" />
                    ) : (profile?.images && profile.images.length > 0) ? (
                        <img src={profile.images[0]} alt={profile.company_name} className="w-full h-full object-cover" />
                    ) : item.image_url ? (
                        <img src={item.image_url} alt={item.name || item.title} className="w-full h-full object-cover" />
                    ) : profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt={profile.company_name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
                            <Package className="w-20 h-20 text-zinc-700" />
                        </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-20">
                        <h3 className="text-3xl font-bold text-white mb-1">{item.name || item.title}</h3>
                        <div className="flex items-center gap-2 text-zinc-300">
                            <Building2 className="w-4 h-4" />
                            <span>{profile?.company_name || "Unknown Company"}</span>
                        </div>
                    </div>
                </div>
                <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-zinc-400 mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{profile?.country || "Global"}</span>
                    </div>
                    <p className="text-zinc-300 line-clamp-3">
                        {item.description || "No description provided."}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags && item.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-400 border border-zinc-700">
                                {tag}
                            </span>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
