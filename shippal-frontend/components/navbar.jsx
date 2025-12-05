"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Ship, Menu, X, ArrowRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [user, setUser] = useState(null)
    const pathname = usePathname()
    const supabase = createClient()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)

        // Check auth state
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => {
            window.removeEventListener("scroll", handleScroll)
            subscription.unsubscribe()
        }
    }, [])

    // Hide navbar on login page if desired, or keep it for consistency. 
    // User asked for "navbar that floating", usually implies global.
    // But often login pages have minimal nav. Let's keep it but maybe simpler?
    // For now, full navbar everywhere.
    if (pathname.startsWith("/dashboard")) {
        return null
    }

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-8 py-4",
                isScrolled ? "py-3" : "py-5"
            )}
        >
            <div
                className={cn(
                    "mx-auto max-w-7xl rounded-2xl transition-all duration-300 border border-transparent",
                    isScrolled
                        ? "bg-zinc-900/80 backdrop-blur-md border-white/10 shadow-lg shadow-black/5"
                        : "bg-transparent"
                )}
            >
                <div className="flex items-center justify-between h-14 px-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex items-center justify-center">
                            <Image src="/logo.svg" alt="ShipPal Logo" width={32} height={32} className="w-8 h-8" />
                        </div>
                        <span className="font-bold text-xl text-white tracking-tight">ShipPal</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/#features" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                            Features
                        </Link>
                        <Link href="/#how-it-works" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                            How it Works
                        </Link>
                        <Link href="/#pricing" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                            Pricing
                        </Link>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link href="/dashboard">
                                    <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/5">
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button
                                    onClick={async () => {
                                        await supabase.auth.signOut()
                                        setUser(null)
                                    }}
                                    variant="outline"
                                    className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                                >
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/login">
                                    <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/5">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="bg-white text-zinc-900 hover:bg-zinc-200 font-medium rounded-full px-6">
                                        Get Started <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-zinc-300 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 p-4 md:hidden">
                    <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-4 shadow-2xl">
                        <Link
                            href="/#features"
                            className="text-lg font-medium text-zinc-300 hover:text-white p-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href="/#how-it-works"
                            className="text-lg font-medium text-zinc-300 hover:text-white p-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            How it Works
                        </Link>
                        <div className="h-px bg-white/10 my-2" />
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="text-lg font-medium text-zinc-300 hover:text-white p-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <Button
                                    onClick={async () => {
                                        await supabase.auth.signOut()
                                        setUser(null)
                                        setIsMobileMenuOpen(false)
                                    }}
                                    variant="outline"
                                    className="w-full border-white/20 bg-transparent text-white"
                                >
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}
