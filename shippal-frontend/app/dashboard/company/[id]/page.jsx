"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { profilesApi } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Building2, MapPin, Globe, Mail, Phone, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CompanyPage() {
    const params = useParams()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadProfile = async () => {
            if (!params.id) return
            try {
                const data = await profilesApi.getById(params.id)
                setProfile(data)
            } catch (error) {
                console.error("Error loading profile:", error)
            } finally {
                setLoading(false)
            }
        }
        loadProfile()
    }, [params.id])

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4">
                <h2 className="text-xl font-bold text-white">Company not found</h2>
                <Link href="/dashboard/matches">
                    <Button variant="outline">Go Back</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Link href="/dashboard/matches" className="inline-flex items-center text-zinc-400 hover:text-white mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Matches
            </Link>

            <div className="grid gap-6">
                {/* Header Card */}
                <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
                    <div className="h-48 bg-gradient-to-r from-blue-900/50 to-purple-900/50 relative">
                        {profile.images && profile.images.length > 0 && (
                            <img
                                src={profile.images[0]}
                                alt="Cover"
                                className="w-full h-full object-cover opacity-50"
                            />
                        )}
                        <div className="absolute -bottom-12 left-8">
                            <div className="w-24 h-24 rounded-full bg-zinc-800 border-4 border-zinc-900 flex items-center justify-center overflow-hidden">
                                {profile.avatar_url ? (
                                    <img src={profile.avatar_url} alt={profile.company_name} className="w-full h-full object-cover" />
                                ) : (
                                    <Building2 className="w-10 h-10 text-zinc-500" />
                                )}
                            </div>
                        </div>
                    </div>
                    <CardContent className="pt-16 pb-8 px-8">
                        <h1 className="text-3xl font-bold text-white mb-2">{profile.company_name || "Unknown Company"}</h1>
                        <div className="flex flex-wrap gap-4 text-zinc-400">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{profile.country || "Global"}</span>
                            </div>
                            {profile.website && (
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4" />
                                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                                        Website
                                    </a>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Details Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <Card className="md:col-span-2 bg-zinc-900 border-zinc-800">
                        <CardContent className="p-6">
                            <h3 className="text-lg font-bold text-white mb-4">About Company</h3>
                            <p className="text-zinc-300 whitespace-pre-wrap">
                                {profile.description || "No description provided."}
                            </p>

                            {profile.images && profile.images.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-lg font-bold text-white mb-4">Gallery</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {profile.images.map((img, i) => (
                                            <div key={i} className="aspect-video rounded-lg overflow-hidden bg-zinc-800">
                                                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <Card className="bg-zinc-900 border-zinc-800 h-fit">
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-lg font-bold text-white mb-4">Contact Information</h3>

                            <div className="flex items-center gap-3 text-zinc-300">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs text-zinc-500">Email</p>
                                    <p className="text-sm truncate">{profile.email || "Hidden"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-zinc-300">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500">Phone</p>
                                    <p className="text-sm">{profile.phone || "Hidden"}</p>
                                </div>
                            </div>

                            <Link href={`/dashboard/messages?id=${profile.id}`}>
                                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-500">
                                    Send Message
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
