"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, ArrowLeft, Ship, Building2, Globe } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [role, setRole] = useState("buyer")
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState("")
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all?fields=name")
                const data = await res.json()
                const sortedCountries = data
                    .map(c => c.name.common)
                    .sort((a, b) => a.localeCompare(b))
                setCountries(sortedCountries)
            } catch (err) {
                console.error("Failed to fetch countries:", err)
            }
        }
        fetchCountries()
    }, [])

    // Reset country when role changes
    useEffect(() => {
        if (role === "seller") {
            setSelectedCountry("Indonesia")
        } else {
            setSelectedCountry("")
        }
    }, [role])

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.target)
        const email = formData.get("email")
        const password = formData.get("password")
        const fullName = formData.get("fullName")
        const companyName = formData.get("companyName")
        // Country is handled by state

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        company_name: companyName,
                        country: selectedCountry,
                        role: role,
                    },
                },
            })

            if (error) throw error

            if (data.session) {
                router.push("/dashboard")
            } else {
                alert("Registration successful! Please check your email to confirm.")
                router.push("/login")
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-screen flex overflow-hidden bg-zinc-950">
            {/* Left Side - Visuals (Same as Login) */}
            <div className="hidden lg:flex w-1/2 bg-zinc-900 relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>

                <div className="relative z-10 p-12 text-white max-w-xl">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
                            <Ship className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">ShipPal</h1>
                    </div>
                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                        Join the Global <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Trade Network
                        </span>
                    </h2>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        Connect with verified buyers and sellers worldwide. Smart matching, secure deals, and AI-powered compliance.
                    </p>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative bg-zinc-950 overflow-y-auto">
                <div className="absolute top-8 left-8 lg:hidden">
                    <Link href="/" className="flex items-center text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>
                </div>

                <Card className="w-full max-w-md border-0 bg-transparent shadow-none">
                    <CardHeader className="space-y-1 px-0">
                        <CardTitle className="text-3xl font-bold tracking-tight text-white">Create an account</CardTitle>
                        <CardDescription className="text-zinc-400 text-base">
                            Get started with ShipPal today
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-0 mt-4">
                        <Tabs defaultValue="buyer" onValueChange={setRole} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border border-zinc-800 mb-6">
                                <TabsTrigger value="buyer" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">I'm a Buyer</TabsTrigger>
                                <TabsTrigger value="seller" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">I'm a Seller</TabsTrigger>
                            </TabsList>

                            <form onSubmit={handleRegister} className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-zinc-300">Email</Label>
                                    <Input id="email" name="email" type="email" placeholder="name@company.com" required className="bg-zinc-900/50 border-zinc-800 text-white h-11" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-zinc-300">Password</Label>
                                    <Input id="password" name="password" type="password" required className="bg-zinc-900/50 border-zinc-800 text-white h-11" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="fullName" className="text-zinc-300">Full Name</Label>
                                    <Input id="fullName" name="fullName" placeholder="John Doe" required className="bg-zinc-900/50 border-zinc-800 text-white h-11" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="companyName" className="text-zinc-300">Company</Label>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                            <Input id="companyName" name="companyName" placeholder="Acme Inc." className="pl-9 bg-zinc-900/50 border-zinc-800 text-white h-11" />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="country" className="text-zinc-300">Country</Label>
                                        {role === "seller" ? (
                                            <div className="relative">
                                                <Globe className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                                <Input
                                                    value="Indonesia"
                                                    disabled
                                                    className="pl-9 bg-zinc-900/50 border-zinc-800 text-zinc-400 h-11 cursor-not-allowed"
                                                />
                                                <p className="text-[10px] text-zinc-500 mt-1">Sellers currently limited to Indonesia</p>
                                            </div>
                                        ) : (
                                            <Select value={selectedCountry} onValueChange={setSelectedCountry} required>
                                                <SelectTrigger className="w-full bg-zinc-900/50 border-zinc-800 text-white h-11">
                                                    <SelectValue placeholder="Select country" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-zinc-900 border-zinc-800 text-white max-h-[200px]">
                                                    {countries.map((country) => (
                                                        <SelectItem key={country} value={country}>
                                                            {country}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                                        {error}
                                    </div>
                                )}

                                <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white mt-2" disabled={loading}>
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Create Account
                                </Button>
                            </form>
                        </Tabs>

                        <div className="mt-8 text-center text-sm text-zinc-500">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-500 hover:text-blue-400 font-medium">
                                Sign in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
