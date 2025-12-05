"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { requestsApi } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, FileText, MoreVertical } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { RequestModal } from "@/components/request-modal"

export default function RequestsPage() {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedRequest, setSelectedRequest] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const searchParams = useSearchParams()
    const supabase = createClient()

    useEffect(() => {
        const loadRequests = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                try {
                    const allRequests = await requestsApi.getAll()
                    // Filter by buyer_id
                    const myRequests = allRequests.filter(r => r.buyer_id === user.id)
                    setRequests(myRequests)
                } catch (error) {
                    console.error("Error loading requests:", error)
                }
            }
            setLoading(false)

            // Check for action=new
            if (searchParams.get('action') === 'new') {
                setIsModalOpen(true)
            }
        }
        loadRequests()
    }, [supabase, searchParams])

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48 bg-zinc-800" />
                        <Skeleton className="h-4 w-64 bg-zinc-800" />
                    </div>
                    <Skeleton className="h-10 w-32 bg-zinc-800" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-40 bg-zinc-800 rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-3/4 bg-zinc-800" />
                                <Skeleton className="h-4 w-full bg-zinc-800" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }



    const handleEdit = (request) => {
        setSelectedRequest(request)
        setIsModalOpen(true)
    }

    const handleAddNew = () => {
        setSelectedRequest(null)
        setIsModalOpen(true)
    }

    const handleSuccess = () => {
        // Reload requests
        const loadRequests = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                try {
                    const allRequests = await requestsApi.getAll()
                    const myRequests = allRequests.filter(r => r.buyer_id === user.id)
                    setRequests(myRequests)
                } catch (error) {
                    console.error("Error loading requests:", error)
                }
            }
        }
        loadRequests()
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">My Requests</h1>
                    <p className="text-zinc-400">Manage your buying requests</p>
                </div>
                <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-500 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New Request
                </Button>
            </div>

            {requests.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <FileText className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No active requests</h3>
                    <p className="text-zinc-400 mb-6">Post a request to find suppliers.</p>
                    <Button onClick={handleAddNew} variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
                        Create Request
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map((request) => (
                        <Card key={request.id} className="bg-zinc-900 border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold text-white line-clamp-1">{request.title}</h3>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-zinc-400 hover:text-white"
                                        onClick={() => handleEdit(request)}
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-zinc-400 text-sm line-clamp-3 mb-4">
                                    {request.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {request.tags && request.tags.map((tag, i) => (
                                        <span key={i} className="px-2 py-1 rounded bg-zinc-950 border border-zinc-800 text-xs text-zinc-500">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <RequestModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                request={selectedRequest}
                onSuccess={handleSuccess}
            />
        </div>
    )
}
