"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { profilesApi, productsApi, requestsApi } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Building2, MapPin, Globe, ArrowLeft, Package, ImageIcon, Info, FileText } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CompanyPage() {
    const params = useParams()
    const [profile, setProfile] = useState(null)
    const [products, setProducts] = useState([])
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            if (!params.id) return
            try {
                const [profileData, productsData, requestsData] = await Promise.all([
                    profilesApi.getById(params.id),
                    productsApi.getByUserId(params.id),
                    requestsApi.getByUserId(params.id)
                ])
                setProfile(profileData)
                setProducts(productsData || [])
                setRequests(requestsData || [])
            } catch (error) {
                console.error("Error loading data:", error)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [params.id])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-black">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-black gap-4">
                <h2 className="text-xl font-bold text-white">Company not found</h2>
                <Link href="/dashboard/matches">
                    <Button variant="outline">Go Back</Button>
                </Link>
            </div>
        )
    }

    const isBuyer = requests.length > 0
    const items = isBuyer ? requests : products
    const itemLabel = isBuyer ? "Requests" : "Products"

    return (
        <div className="min-h-screen bg-black pb-20">
            {/* Hero Section */}
            <div className="relative h-[40vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
                {profile.images && profile.images.length > 0 ? (
                    <img
                        src={profile.images[0]}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-zinc-900" />
                )}

                <div className="absolute top-6 left-6 z-50">
                    <Link href="/dashboard/contacts">
                        <Button variant="ghost" size="sm" className="text-white bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Contacts
                        </Button>
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row items-end gap-6">
                        <div className="w-32 h-32 rounded-2xl bg-zinc-900 border-4 border-black shadow-2xl overflow-hidden shrink-0">
                            {profile.avatar_url ? (
                                <img src={profile.avatar_url} alt={profile.company_name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Building2 className="w-12 h-12 text-zinc-600" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 mb-2">
                            <h1 className="text-4xl font-bold text-white mb-2">{profile.company_name || "Unknown Company"}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-zinc-300 text-sm">
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-blue-500" />
                                    <span>{profile.country || "Global"}</span>
                                </div>
                                {profile.website && (
                                    <div className="flex items-center gap-1.5">
                                        <Globe className="w-4 h-4 text-blue-500" />
                                        <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                                            Visit Website
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-2">
                            <Link href={`/dashboard/messages?id=${profile.id}`}>
                                <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 px-8">
                                    Send Message
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="container mx-auto max-w-6xl px-6 mt-8">
                <Tabs defaultValue="about" className="space-y-8">
                    <TabsList className="bg-zinc-900/50 border border-zinc-800 p-1">
                        <TabsTrigger value="about" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400">
                            <Info className="w-4 h-4 mr-2" />
                            About
                        </TabsTrigger>
                        <TabsTrigger value="items" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400">
                            {isBuyer ? <FileText className="w-4 h-4 mr-2" /> : <Package className="w-4 h-4 mr-2" />}
                            {itemLabel} ({items.length})
                        </TabsTrigger>
                        <TabsTrigger value="gallery" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400">
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Gallery
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="about" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardContent className="p-8">
                                <h3 className="text-xl font-bold text-white mb-4">Company Overview</h3>
                                <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-lg">
                                    {profile.description || "No description provided."}
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="items" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {items.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {items.map((item) => (
                                    <Card key={item.id} className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all group">
                                        <div className="aspect-video bg-zinc-800 relative overflow-hidden">
                                            {item.images && item.images.length > 0 ? (
                                                <img
                                                    src={item.images[0]}
                                                    alt={item.name || item.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    {isBuyer ? <FileText className="w-12 h-12 text-zinc-700" /> : <Package className="w-12 h-12 text-zinc-700" />}
                                                </div>
                                            )}
                                        </div>
                                        <CardContent className="p-5">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-white text-lg line-clamp-1">{item.name || item.title}</h4>
                                                {item.price && (
                                                    <span className="text-blue-400 font-mono font-bold">${item.price?.toLocaleString()}</span>
                                                )}
                                                {item.budget && (
                                                    <span className="text-green-400 font-mono font-bold">${item.budget?.toLocaleString()}</span>
                                                )}
                                            </div>
                                            <p className="text-zinc-400 text-sm line-clamp-2 mb-4">{item.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {item.tags && item.tags.map((tag, i) => (
                                                    <span key={i} className="px-2 py-1 rounded-md bg-zinc-800 text-xs text-zinc-500 border border-zinc-700">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-zinc-900/50 rounded-xl border border-zinc-800 border-dashed">
                                {isBuyer ? <FileText className="w-16 h-16 text-zinc-700 mx-auto mb-4" /> : <Package className="w-16 h-16 text-zinc-700 mx-auto mb-4" />}
                                <h3 className="text-xl font-bold text-white mb-2">No {itemLabel} Listed</h3>
                                <p className="text-zinc-500">This company hasn't listed any {itemLabel.toLowerCase()} yet.</p>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="gallery" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {profile.images && profile.images.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {profile.images.map((img, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 group relative"
                                    >
                                        <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-zinc-900/50 rounded-xl border border-zinc-800 border-dashed">
                                <ImageIcon className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">No Images Available</h3>
                                <p className="text-zinc-500">This company hasn't uploaded any gallery images.</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
