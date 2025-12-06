"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Ship, Loader2, ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const supabase = createClient()

    const autoFill = (role) => {
        if (role === 'buyer') {
            setEmail("garrett70@example.com")
            setPassword("password123")
        } else {
            setEmail("lthompson@example.com")
            setPassword("password123")
        }
    }

    async function handleSignIn(event) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                throw error
            }

            router.push("/dashboard")
            router.refresh()
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full h-screen flex overflow-hidden bg-zinc-950">
            {/* Left Side - Visuals */}
            <div className="hidden lg:flex w-1/2 bg-zinc-900 relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50"></div>

                {/* Animated Gradient Blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>

                <div className="relative z-10 p-12 text-white max-w-xl">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="flex items-center justify-center">
                            <Image src="/logo.svg" alt="ShipPal Logo" width={48} height={48} className="w-12 h-12" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">ShipPal</h1>
                    </div>
                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                        Welcome back to the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Future of Trade
                        </span>
                    </h2>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        Access your dashboard to manage shipments, negotiate deals, and track compliance documents in real-time.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative bg-zinc-950">
                <div className="absolute top-8 left-8 lg:hidden">
                    <Link href="/" className="flex items-center text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>
                </div>

                <Card className="w-full max-w-md border-0 bg-transparent shadow-none">
                    <CardHeader className="space-y-1 px-0">
                        <CardTitle className="text-3xl font-bold tracking-tight text-white">Sign in</CardTitle>
                        <CardDescription className="text-zinc-400 text-base">
                            Enter your email below to access your account
                        </CardDescription>
                    </CardHeader>

                    {/* Proactive Demo Hints */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 mb-6">
                        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                            Demo Access (Click to Auto-fill)
                        </div>
                        <div className="space-y-3">
                            <button
                                type="button"
                                className="w-full flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800/50 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group cursor-pointer text-left"
                                onClick={() => autoFill('buyer')}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                        <span className="text-sm font-bold">B</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-zinc-200 group-hover:text-blue-400 transition-colors">Buyer Account</span>
                                        <code className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">garrett70@example.com</code>
                                    </div>
                                </div>
                                <div className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                    Click to fill &rarr;
                                </div>
                            </button>

                            <button
                                type="button"
                                className="w-full flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800/50 hover:border-green-500/50 hover:bg-green-500/5 transition-all group cursor-pointer text-left"
                                onClick={() => autoFill('seller')}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                                        <span className="text-sm font-bold">S</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-zinc-200 group-hover:text-green-400 transition-colors">Seller Account</span>
                                        <code className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">lthompson@example.com</code>
                                    </div>
                                </div>
                                <div className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                    Click to fill &rarr;
                                </div>
                            </button>
                        </div>
                    </div>

                    <CardContent className="px-0 mt-4">
                        {error && (
                            <div className="mb-6 p-4 text-sm text-red-400 bg-red-900/10 border border-red-900/20 rounded-xl">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSignIn} className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-zinc-300">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-blue-500 focus:ring-blue-500/20 h-12 transition-all"
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-zinc-300">Password</Label>
                                    <Link href="#" className="text-sm font-medium text-blue-400 hover:text-blue-300">
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-zinc-900/50 border-zinc-800 text-white focus:border-blue-500 focus:ring-blue-500/20 h-12 transition-all"
                                />
                            </div>
                            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white text-base font-medium rounded-xl shadow-lg shadow-blue-600/10 transition-all hover:scale-[1.02]" disabled={isLoading}>
                                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Sign In"}
                            </Button>
                        </form>

                        <div className="mt-8 text-center text-sm text-zinc-500">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
