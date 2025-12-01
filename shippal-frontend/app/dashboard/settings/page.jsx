"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, User, Building2, Globe, Mail } from "lucide-react"

export default function SettingsPage() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }
        getUser()
    }, [supabase])

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        )
    }

    const metadata = user?.user_metadata || {}

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-zinc-400">Manage your account preferences</p>
            </div>

            <div className="space-y-6">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Profile Information</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Update your personal and company details
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label className="text-zinc-300">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                <Input value={user?.email} disabled className="pl-9 bg-zinc-950 border-zinc-800 text-zinc-400" />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label className="text-zinc-300">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                <Input defaultValue={metadata.full_name} className="pl-9 bg-zinc-950 border-zinc-800 text-white" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label className="text-zinc-300">Company Name</Label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                    <Input defaultValue={metadata.company_name} className="pl-9 bg-zinc-950 border-zinc-800 text-white" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-zinc-300">Country</Label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                    <Input defaultValue={metadata.country} className="pl-9 bg-zinc-950 border-zinc-800 text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                                Save Changes
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Account Security</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Manage your password and security settings
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label className="text-zinc-300">New Password</Label>
                            <Input type="password" className="bg-zinc-950 border-zinc-800 text-white" />
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-zinc-300">Confirm Password</Label>
                            <Input type="password" className="bg-zinc-950 border-zinc-800 text-white" />
                        </div>
                        <div className="pt-4 flex justify-end">
                            <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
                                Update Password
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
