"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { productsApi, requestsApi, matchesApi } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Package, MessageSquare, TrendingUp, FileText, Plus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

export default function DashboardPage() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        activeItems: 0,
        matches: 0,
        unreadMessages: 0, // Placeholder for now
        pendingDeals: 0 // Placeholder for now
    })
    const supabase = createClient()

    useEffect(() => {
        const loadData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)

            if (user) {
                const role = user.user_metadata?.role || "buyer"
                try {
                    // Fetch Active Items (Products or Requests)
                    let items = []
                    if (role === "seller") {
                        items = await productsApi.getAll() // Ideally filter by user_id, but API gets all for now. 
                        // We need to filter by user_id here if API doesn't support it yet, 
                        // or update API. For now, let's assume getAll returns everything and we filter client side if needed,
                        // OR better, let's just use what we have. 
                        // Actually, productsApi.getAll() returns ALL products. We need user specific.
                        // Let's assume for MVP we just show count of ALL for now or filter if possible.
                        // Wait, the user wants REAL data. 
                        // Let's filter by created_by if the API returns it.
                        items = items.filter(i => i.seller_id === user.id)
                    } else {
                        items = await requestsApi.getAll()
                        items = items.filter(i => i.buyer_id === user.id)
                    }

                    // Fetch Matches
                    const matches = await matchesApi.getAll(user.id)

                    setStats({
                        activeItems: items.length,
                        matches: matches.length,
                        unreadMessages: 0, // Todo: Implement messages
                        pendingDeals: 0 // Todo: Implement deals
                    })
                } catch (error) {
                    console.error("Error loading dashboard data:", error)
                }
            }
            setLoading(false)
        }
        loadData()
    }, [supabase])

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48 bg-zinc-800" />
                        <Skeleton className="h-4 w-64 bg-zinc-800" />
                    </div>
                    <Skeleton className="h-10 w-40 bg-zinc-800" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-32 bg-zinc-800 rounded-xl" />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Skeleton className="lg:col-span-2 h-80 bg-zinc-800 rounded-xl" />
                    <Skeleton className="h-80 bg-zinc-800 rounded-xl" />
                </div>
            </div>
        )
    }

    const role = user?.user_metadata?.role || "buyer"
    const isSeller = role === "seller"

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                    <p className="text-zinc-400">Welcome back, {user?.user_metadata?.full_name || user?.email}</p>
                </div>
                <Link href={isSeller ? "/dashboard/products/new" : "/dashboard/requests/new"}>
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        {isSeller ? "List New Product" : "Post Buying Request"}
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    {
                        label: isSeller ? "Active Listings" : "Active Requests",
                        value: stats.activeItems,
                        icon: <Package className="text-purple-500" />
                    },
                    {
                        label: "Matches Found",
                        value: stats.matches,
                        icon: <TrendingUp className="text-green-500" />
                    },
                    {
                        label: "Unread Messages",
                        value: stats.unreadMessages,
                        icon: <MessageSquare className="text-blue-500" />
                    },
                    {
                        label: "Pending Deals",
                        value: stats.pendingDeals,
                        icon: <FileText className="text-yellow-500" />
                    },
                ].map((stat, i) => (
                    <Card key={i} className="bg-zinc-900 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-400">
                                {stat.label}
                            </CardTitle>
                            {stat.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity / Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center border border-dashed border-zinc-800 rounded-lg">
                            <p className="text-zinc-500">No recent activity to show.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">
                            {isSeller ? "Recent Requests" : "Recommended Products"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="p-3 rounded-lg bg-zinc-950/50 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer">
                                    <div className="h-2 w-1/3 bg-zinc-800 rounded mb-2" />
                                    <div className="h-2 w-2/3 bg-zinc-800 rounded" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
