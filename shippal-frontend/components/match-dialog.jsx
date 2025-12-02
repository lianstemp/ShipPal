"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageSquare, X } from "lucide-react"
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
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }))
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }))
            }, 250)

            return () => clearInterval(interval)
        }
    }, [isOpen])

    if (!match || !partner) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 text-white p-0 overflow-hidden">
                <DialogTitle className="sr-only">It's a Match!</DialogTitle>
                <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-purple-600/20" />

                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative z-10 mb-8"
                    >
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                            It's a Match!
                        </h2>
                        <p className="text-zinc-400">
                            You and {partner.company_name || partner.full_name} are connected.
                        </p>
                    </motion.div>

                    <div className="flex items-center gap-4 mb-8 relative z-10">
                        <div className="w-20 h-20 rounded-full bg-zinc-800 border-4 border-zinc-900 overflow-hidden">
                            {partner.avatar_url ? (
                                <img src={partner.avatar_url} alt="Partner" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-zinc-500">
                                    {partner.full_name?.[0]}
                                </div>
                            )}
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg z-20 -ml-6 border-4 border-zinc-950">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full relative z-10">
                        <Link href={contactId ? `/dashboard/messages?id=${contactId}` : `/dashboard/messages?id=${match.id}`} className="w-full">
                            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white h-12 text-lg">
                                Send a Message
                            </Button>
                        </Link>
                        <Button variant="ghost" onClick={onClose} className="text-zinc-500 hover:text-white">
                            Keep Browsing
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
