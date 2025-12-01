"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Ship, Loader2, ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()
    const supabase = createClient()

    async function handleSignIn(event) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        const formData = new FormData(event.target)
        const email = formData.get("email")
        const password = formData.get("password")

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                throw error
            }

            router.push("/")
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
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50"></div>

                {/* Animated Gradient Blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>

                <div className="relative z-10 p-12 text-white max-w-xl">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
                            <Ship className="w-8 h-8 text-white" />
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
                                    className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-blue-500 focus:ring-blue-500/20 h-12"
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
                                    className="bg-zinc-900/50 border-zinc-800 text-white focus:border-blue-500 focus:ring-blue-500/20 h-12"
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
