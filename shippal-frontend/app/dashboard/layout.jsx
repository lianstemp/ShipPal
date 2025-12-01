"use client"

import { useEffect, useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Loader2 } from "lucide-react"
import { matchesApi } from "@/lib/api"
import { MatchDialog } from "@/components/match-dialog"

export default function DashboardLayout({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [newMatch, setNewMatch] = useState(null)
    const userRef = useRef(null)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        let channel = null

        const getUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser()
            if (error || !user) {
                router.push("/login")
            } else {
                setUser(user)
                userRef.current = user

                // Subscribe to match updates globally
                channel = supabase
                    .channel('global-matches-updates')
                    .on('postgres_changes', {
                        event: 'UPDATE',
                        schema: 'public',
                        table: 'matches',
                        filter: `buyer_id=eq.${user.id}`
                    }, (payload) => handleMatchUpdate(payload, user))
                    .on('postgres_changes', {
                        event: 'UPDATE',
                        schema: 'public',
                        table: 'matches',
                        filter: `seller_id=eq.${user.id}`
                    }, (payload) => handleMatchUpdate(payload, user))
                    .subscribe()
            }
            setLoading(false)
        }
        getUser()

        return () => {
            if (channel) {
                supabase.removeChannel(channel)
            }
        }
    }, [router, supabase])

    const handleMatchUpdate = async (payload, currentUser) => {
        const { new: newRecord, old: oldRecord } = payload
        const userToUse = currentUser || userRef.current

        if (userToUse) {
            // Check if this update was a "Match Acceptance"
            if (oldRecord.status === 'pending' && newRecord.status === 'matched') {
                // Fetch full match details to get partner info
                try {
                    // We can use getById since we have the ID
                    const fullMatch = await matchesApi.getById(newRecord.id)

                    if (fullMatch) {
                        const role = userToUse.user_metadata?.role || "buyer"
                        const isBuyer = role === "buyer"
                        const getProfile = (p) => Array.isArray(p) ? p[0] : p
                        const partner = isBuyer ? getProfile(fullMatch.seller) : getProfile(fullMatch.buyer)
                        setNewMatch({ match: newRecord, partner })
                    }
                } catch (error) {
                    console.error("Error fetching match details for notification:", error)
                }
            }
        }
    }

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-zinc-950">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex">
            <Sidebar user={user} />
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto h-screen">
                {children}
            </main>

            <MatchDialog
                isOpen={!!newMatch}
                onClose={() => setNewMatch(null)}
                match={newMatch?.match}
                partner={newMatch?.partner}
            />
        </div>
    )
}
