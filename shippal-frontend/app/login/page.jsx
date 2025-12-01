"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ship, Globe, Anchor, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()
    const supabase = createClient()

    async function handleSignUp(event) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        const formData = new FormData(event.target)
        const email = formData.get("email")
        const password = formData.get("password")
        const role = formData.get("role") // 'buyer' or 'seller'
        const fullName = formData.get("fullName")

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        role: role,
                        full_name: fullName,
                    },
                },
            })

            if (error) {
                throw error
            }

            // For now, just redirect or show success. 
            // In a real app, you might show a "Check your email" message.
            // But for hackathon/dev with auto-confirm, we can try to sign in or just alert.
            alert("Registration successful! Please check your email to confirm.")

        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

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
        <div className="w-full h-screen flex overflow-hidden bg-zinc-50 dark:bg-zinc-950">
            {/* Left Side - Visuals */}
            <div className="hidden lg:flex w-1/2 bg-zinc-900 relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494412574643-35d324698427?q=80&w=2835&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-zinc-900/50"></div>

                <div className="relative z-10 p-12 text-white max-w-xl">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="p-3 bg-blue-600 rounded-xl">
                            <Ship className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">ShipPal</h1>
                    </div>
                    <h2 className="text-3xl font-bold mb-6 leading-tight">
                        Connect Local MSMEs with <span className="text-blue-400">Global Buyers</span>
                    </h2>
                    <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                        Join the smart matchmaking platform that revolutionizes international trade.
                        Swipe, match, and export with confidence using our AI-powered ecosystem.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                            <Globe className="w-6 h-6 text-blue-400" />
                            <span className="font-medium">Global Reach</span>
                            <span className="text-sm text-zinc-400">Access buyers from 50+ countries</span>
                        </div>
                        <div className="flex flex-col gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                            <Anchor className="w-6 h-6 text-orange-400" />
                            <span className="font-medium">Secure Trade</span>
                            <span className="text-sm text-zinc-400">Escrow payments & verified logistics</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                <div className="absolute top-8 right-8">
                    <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">
                        Back to Home
                    </Link>
                </div>

                <Card className="w-full max-w-md border-0 shadow-none sm:border sm:shadow-sm bg-transparent sm:bg-white dark:sm:bg-zinc-900">
                    <Tabs defaultValue="login" className="w-full">
                        <CardHeader className="space-y-1">
                            <div className="flex items-center justify-between mb-2">
                                <CardTitle className="text-2xl font-bold tracking-tight">Welcome</CardTitle>
                            </div>
                            <CardDescription>
                                Enter your credentials to access your account
                            </CardDescription>
                            <TabsList className="grid w-full grid-cols-2 mt-4">
                                <TabsTrigger value="login">Sign In</TabsTrigger>
                                <TabsTrigger value="register">Sign Up</TabsTrigger>
                            </TabsList>
                        </CardHeader>

                        <CardContent>
                            {error && (
                                <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md">
                                    {error}
                                </div>
                            )}

                            <TabsContent value="login">
                                <form onSubmit={handleSignIn} className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" name="password" type="password" required />
                                    </div>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                        Sign In
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="register">
                                <form onSubmit={handleSignUp} className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label>I want to join as:</Label>
                                        <Tabs defaultValue="buyer" className="w-full">
                                            <TabsList className="grid w-full grid-cols-2">
                                                <TabsTrigger value="buyer" onClick={() => document.getElementById('role-input').value = 'buyer'}>Buyer</TabsTrigger>
                                                <TabsTrigger value="seller" onClick={() => document.getElementById('role-input').value = 'seller'}>Seller</TabsTrigger>
                                            </TabsList>
                                            <input type="hidden" id="role-input" name="role" defaultValue="buyer" />
                                        </Tabs>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input id="fullName" name="fullName" type="text" placeholder="John Doe" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="register-email">Email</Label>
                                        <Input id="register-email" name="email" type="email" placeholder="m@example.com" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="register-password">Password</Label>
                                        <Input id="register-password" name="password" type="password" required />
                                    </div>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                        Create Account
                                    </Button>
                                </form>
                            </TabsContent>
                        </CardContent>
                    </Tabs>
                </Card>
            </div>
        </div>
    )
}
