"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, User, Building2, Globe, Mail } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/ui/image-upload"

export default function SettingsPage() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [countries, setCountries] = useState([])

    // Form State
    const [fullName, setFullName] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [selectedCountry, setSelectedCountry] = useState("")
    const [images, setImages] = useState([])
    const [avatarUrl, setAvatarUrl] = useState("")

    const supabase = createClient()

    useEffect(() => {
        const loadData = async () => {
            // Fetch User Auth
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)

            if (user) {
                // Fetch Public Profile (Source of Truth)
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                if (profile) {
                    setFullName(profile.full_name || "")
                    setCompanyName(profile.company_name || "")
                    setSelectedCountry(profile.country || "")
                    setImages(profile.images || [])
                    setAvatarUrl(profile.avatar_url || "")
                } else if (user.user_metadata) {
                    // Fallback to metadata if profile doesn't exist
                    setFullName(user.user_metadata.full_name || "")
                    setCompanyName(user.user_metadata.company_name || "")
                    setSelectedCountry(user.user_metadata.country || "")
                    setImages(user.user_metadata.images || [])
                    setAvatarUrl(user.user_metadata.avatar_url || "")
                }
            }

            // Fetch Countries
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

            setLoading(false)
        }
        loadData()
    }, [supabase])

    const handleSave = async () => {
        setSaving(true)
        try {
            if (!user) return

            // 1. Update Public Profile
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    email: user.email, // Ensure email is synced
                    full_name: fullName,
                    company_name: companyName,
                    country: selectedCountry,
                    images: images,
                    avatar_url: avatarUrl,
                    updated_at: new Date().toISOString()
                })

            if (profileError) throw profileError

            // 2. Update Auth Metadata (Keep in sync)
            const { error: authError } = await supabase.auth.updateUser({
                data: {
                    full_name: fullName,
                    company_name: companyName,
                    country: selectedCountry,
                    images: images,
                    avatar_url: avatarUrl
                }
            })

            if (authError) throw authError

            alert("Profile updated successfully!")
        } catch (error) {
            console.error("Error updating profile:", error)
            alert("Failed to update profile.")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 space-y-2">
                    <Skeleton className="h-8 w-48 bg-zinc-800" />
                    <Skeleton className="h-4 w-64 bg-zinc-800" />
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-[600px] bg-zinc-800 rounded-xl" />
                    <Skeleton className="h-[300px] bg-zinc-800 rounded-xl" />
                </div>
            </div>
        )
    }

    const metadata = user?.user_metadata || {}
    const role = metadata.role || "buyer"

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
                        {/* Avatar Upload */}
                        <div className="flex flex-col gap-2 mb-4">
                            <Label className="text-zinc-300">Profile Picture</Label>
                            <div className="flex items-center gap-6">
                                <div className="w-40 h-40">
                                    <ImageUpload
                                        value={avatarUrl ? [avatarUrl] : []}
                                        onChange={(urls) => setAvatarUrl(urls[0] || "")}
                                        maxFiles={1}
                                        bucket="images"
                                    />
                                </div>
                                <div className="text-sm text-zinc-500">
                                    <p className="mb-1">Upload a profile picture.</p>
                                    <p>Recommended size: 500x500px</p>
                                </div>
                            </div>
                        </div>

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
                                <Input
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="pl-9 bg-zinc-950 border-zinc-800 text-white"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label className="text-zinc-300">Company Name</Label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                    <Input
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        className="pl-9 bg-zinc-950 border-zinc-800 text-white"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-zinc-300">Country</Label>
                                {role === "seller" ? (
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                        <Input
                                            value="Indonesia"
                                            disabled
                                            className="pl-9 bg-zinc-950 border-zinc-800 text-zinc-400 cursor-not-allowed"
                                        />
                                        <p className="text-[10px] text-zinc-500 mt-1">Sellers currently limited to Indonesia</p>
                                    </div>
                                ) : (
                                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                                        <SelectTrigger className="w-full bg-zinc-950 border-zinc-800 text-white h-10">
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

                        <div className="grid gap-2">
                            <Label className="text-zinc-300">Company Images</Label>
                            <ImageUpload
                                value={images}
                                onChange={setImages}
                                maxFiles={5}
                            />
                            <p className="text-xs text-zinc-500">
                                Upload up to 5 images of your company, factory, or products.
                            </p>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-blue-600 hover:bg-blue-500 text-white"
                            >
                                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {saving ? "Saving..." : "Save Changes"}
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
