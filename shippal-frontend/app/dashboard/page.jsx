"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { productsApi, requestsApi, matchesApi } from "@/lib/api"
import { dealsApi } from "@/lib/api/deals"
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
        unreadMessages: 0,
        pendingDeals: 0
    })
    const [recentActivity, setRecentActivity] = useState([])
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
                        items = await productsApi.getAll()
                        items = items.filter(i => i.seller_id === user.id)
                    } else {
                        items = await requestsApi.getAll()
                        items = items.filter(i => i.buyer_id === user.id)
                    }

                    // Fetch Matches
                    const matches = await matchesApi.getAll(user.id)

                    // Fetch Deals
                    const deals = await dealsApi.getAll(user.id)
                    const pendingDeals = deals.filter(d => d.status !== 'completed' && d.status !== 'cancelled')

                    setStats({
                        activeItems: items.length,
                        matches: matches.length,
                        unreadMessages: 0, // Placeholder
                        pendingDeals: pendingDeals.length
                    })

                    // Set Recent Activity (Mix of new items and deals)
                    const activity = [
                        ...items.map(i => ({ type: role === 'seller' ? 'product' : 'request', ...i })),
                        ...deals.map(d => ({ type: 'deal', ...d }))
                    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5)

                    setRecentActivity(activity)

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
                <Link href={isSeller ? "/dashboard/products?action=new" : "/dashboard/requests?action=new"}>
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

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentActivity.length > 0 ? (
                            <div className="space-y-4">
                                {recentActivity.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-zinc-950/50 border border-zinc-800">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'deal' ? 'bg-yellow-500/10 text-yellow-500' :
                                                    item.type === 'product' ? 'bg-purple-500/10 text-purple-500' :
                                                        'bg-blue-500/10 text-blue-500'
                                                }`}>
                                                {item.type === 'deal' ? <FileText className="w-5 h-5" /> :
                                                    item.type === 'product' ? <Package className="w-5 h-5" /> :
                                                        <FileText className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">
                                                    {item.type === 'deal' ? `Deal: ${item.title}` :
                                                        item.type === 'product' ? `Listed: ${item.name}` :
                                                            `Requested: ${item.title}`}
                                                </p>
                                                <p className="text-xs text-zinc-500">
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            {item.status && (
                                                <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                                        item.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                                            'bg-zinc-800 text-zinc-400'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-64 flex items-center justify-center border border-dashed border-zinc-800 rounded-lg">
                                <p className="text-zinc-500">No recent activity to show.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">
                            Quick Stats
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-zinc-950/50 border border-zinc-800">
                                <p className="text-sm text-zinc-400 mb-1">Total Value</p>
                                <p className="text-2xl font-bold text-white">$0.00</p>
                            </div>
                            <div className="p-4 rounded-lg bg-zinc-950/50 border border-zinc-800">
                                <p className="text-sm text-zinc-400 mb-1">Success Rate</p>
                                <p className="text-2xl font-bold text-white">100%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
