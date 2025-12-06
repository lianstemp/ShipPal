"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function DealHeader({ deal }) {
    const router = useRouter()

    if (!deal) return null

    return (
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-zinc-800 text-zinc-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-white">Deal #{deal.id.slice(0, 8)}</h1>
                    <Badge variant="outline" className={cn(
                        "uppercase text-[10px] tracking-wider",
                        deal.status === 'completed' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                    )}>
                        {deal.status.replace('_', ' ')}
                    </Badge>
                </div>
                <p className="text-zinc-400 text-sm">Created on {new Date(deal.created_at).toLocaleDateString()}</p>
            </div>
        </div>
    )
}
