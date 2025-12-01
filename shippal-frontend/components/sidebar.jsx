"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    Flame,
    Package,
    MessageSquare,
    Settings,
    LogOut,
    FileText,
    TrendingUp
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function Sidebar({ user }) {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()
    const role = user?.user_metadata?.role || "buyer"

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push("/login")
    }

    const links = [
        {
            href: "/dashboard",
            label: "Dashboard",
            icon: LayoutDashboard,
            roles: ["buyer", "seller"]
        },
        {
            href: "/dashboard/match",
            label: "Matchmaking",
            icon: Flame,
            roles: ["buyer", "seller"]
        },
        {
            href: "/dashboard/products",
            label: "My Products",
            icon: Package,
            roles: ["seller"]
        },
        {
            href: "/dashboard/requests",
            label: "My Requests",
            icon: FileText,
            roles: ["buyer"]
        },
        {
            href: "/dashboard/matches",
            label: "Matches",
            icon: TrendingUp,
            roles: ["buyer", "seller"]
        },
        {
            href: "/dashboard/messages",
            label: "Messages",
            icon: MessageSquare,
            roles: ["buyer", "seller"]
        },
        {
            href: "/dashboard/settings",
            label: "Settings",
            icon: Settings,
            roles: ["buyer", "seller"]
        }
    ]

    const filteredLinks = links.filter(link => link.roles.includes(role))

    return (
        <div className="hidden md:flex flex-col w-64 bg-zinc-950 border-r border-zinc-800 h-screen fixed left-0 top-0">
            <div className="p-6 border-b border-zinc-800">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-white">S</span>
                    </div>
                    <span className="text-xl font-bold text-white">ShipPal</span>
                </Link>
                <div className="mt-4 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 w-fit">
                    <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        {role} Account
                    </span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {filteredLinks.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href
                    return (
                        <Link key={link.href} href={link.href}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-3 text-zinc-400 hover:text-white hover:bg-zinc-900",
                                    isActive && "bg-blue-600/10 text-blue-500 hover:bg-blue-600/20 hover:text-blue-400"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {link.label}
                            </Button>
                        </Link>
                    )
                })}
            </div>

            <div className="p-4 border-t border-zinc-800">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold">
                        {user?.email?.[0].toUpperCase()}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">
                            {user?.user_metadata?.full_name || "User"}
                        </p>
                        <p className="text-xs text-zinc-500 truncate">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <Button
                    variant="outline"
                    className="w-full justify-start gap-3 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
                    onClick={handleSignOut}
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    )
}
