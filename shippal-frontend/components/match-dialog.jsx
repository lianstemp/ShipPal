"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Handshake, X, ArrowRight, Building2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { useEffect } from "react"

export function MatchDialog({ isOpen, onClose, match, partner, contactId }) {
    useEffect(() => {
        if (isOpen) {
            const duration = 3 * 1000
            const animationEnd = Date.now() + duration
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }

            const random = (min, max) => Math.random() * (max - min) + min

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now()

                if (timeLeft <= 0) {
                    return clearInterval(interval)
                }

                const particleCount = 50 * (timeLeft / duration)
                // Use Blue and White confetti for a more professional look
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#3b82f6', '#ffffff', '#60a5fa']
                }))
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#3b82f6', '#ffffff', '#60a5fa']
                }))
            }, 250)

            return () => clearInterval(interval)
        }
    }, [isOpen])

    if (!match || !partner) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 text-white p-0 overflow-hidden shadow-2xl">
                <DialogTitle className="sr-only">New Connection</DialogTitle>

                {/* Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-zinc-950 to-zinc-950" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ type: "spring", duration: 0.6 }}
                        className="relative z-10 mb-8"
                    >
                        <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-4 ring-1 ring-blue-500/20">
                            <Handshake className="w-8 h-8 text-blue-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                            New Connection Established
                        </h2>
                        <p className="text-zinc-400 text-sm max-w-[280px] mx-auto leading-relaxed">
                            You are now connected with <span className="text-white font-medium">{partner.company_name || partner.full_name}</span>.
                        </p>
                    </motion.div>

                    {/* Profile Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 mb-8 flex items-center gap-4 relative z-10 backdrop-blur-sm"
                    >
                        <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 overflow-hidden shrink-0">
                            {partner.avatar_url ? (
                                <img src={partner.avatar_url} alt="Partner" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-lg font-bold text-zinc-500">
                                    {partner.full_name?.[0]}
                                </div>
                            )}
                        </div>
                        <div className="text-left overflow-hidden">
                            <h3 className="font-bold text-white truncate">{partner.full_name}</h3>
                            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                                <Building2 className="w-3 h-3" />
                                <span className="truncate">{partner.company_name || "Company"}</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex flex-col gap-3 w-full relative z-10">
                        <Link href={contactId ? `/dashboard/messages?id=${contactId}` : `/dashboard/messages?id=${match.id}`} className="w-full" onClick={onClose}>
                            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white h-11 font-medium transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.3)]">
                                Start Conversation
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Button variant="ghost" onClick={onClose} className="text-zinc-500 hover:text-white hover:bg-zinc-900">
                            Maybe Later
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
