"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Loader2, ArrowLeft, CheckCircle2, Circle, Upload, FileText, CreditCard, Truck, Package, Download } from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = [
    { id: 'negotiating', label: 'Negotiating', icon: FileText },
    { id: 'sealed', label: 'Sealed', icon: CheckCircle2 },
    { id: 'payment_pending', label: 'Payment', icon: CreditCard },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'completed', label: 'Completed', icon: CheckCircle2 },
]

export default function DealPage() {
    const params = useParams()
    const router = useRouter()
    const dealId = params.dealId
    const [deal, setDeal] = useState(null)
    const [loading, setLoading] = useState(true)
    const [documents, setDocuments] = useState([])
    const [activeTab, setActiveTab] = useState('negotiating')
    const [uploadingDocId, setUploadingDocId] = useState(null)
    const [user, setUser] = useState(null)
    const [selectedTask, setSelectedTask] = useState(null)
    const supabase = createClient()

    useEffect(() => {
        const loadDeal = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)

            try {
                // Fetch deal with items
                const { data: dealData, error: dealError } = await supabase
                    .from('deals')
                    .select('*, items:deal_items(*), contact:contacts(*)')
                    .eq('id', dealId)
                    .single()

                if (dealError) throw dealError
                setDeal(dealData)

                // Set initial active tab based on status, but ensure it's a valid step
                if (dealData && STEPS.some(s => s.id === dealData.status)) {
                    setActiveTab(dealData.status)
                }

                // Fetch documents
                const { data: docs } = await supabase
                    .from('compliance_documents')
                    .select('*')
                    .eq('deal_id', dealId)
                setDocuments(docs || [])

            } catch (error) {
                console.error("Error loading deal:", error)
            } finally {
                setLoading(false)
            }
        }
        loadDeal()

        // Subscribe to changes
        const channel = supabase
            .channel(`deal:${dealId}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'deals', filter: `id=eq.${dealId}` }, (payload) => {
                setDeal(prev => ({ ...prev, ...payload.new }))
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'compliance_documents', filter: `deal_id=eq.${dealId}` }, () => {
                // Reload docs
                supabase.from('compliance_documents').select('*').eq('deal_id', dealId).then(({ data }) => setDocuments(data || []))
            })
            .subscribe()

        return () => supabase.removeChannel(channel)
    }, [dealId, supabase])

    const handleFileUpload = async (docId, file) => {
        if (!file) return
        setUploadingDocId(docId)
        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${dealId}/${docId}.${fileExt}`
            const { error: uploadError } = await supabase.storage
                .from('compliance_docs')
                .upload(fileName, file, { upsert: true })

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('compliance_docs')
                .getPublicUrl(fileName)

            // Update document record
            const { error: updateError } = await supabase
                .from('compliance_documents')
                .update({
                    status: 'completed',
                    file_url: publicUrl
                })
                .eq('id', docId)

            if (updateError) throw updateError

            // Optimistic update
            setDocuments(prev => prev.map(d => d.id === docId ? { ...d, status: 'completed', file_url: publicUrl } : d))

        } catch (error) {
            console.error("Error uploading file:", error)
            alert("Failed to upload file")
        } finally {
            setUploadingDocId(null)
        }
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>
    }

    if (!deal) {
        return <div className="p-8 text-center">Deal not found</div>
    }

    const currentStepIndex = STEPS.findIndex(s => s.id === deal.status)

    // Helper to group documents
    const sellerDocs = documents.filter(d => d.owner_role === 'seller' || !d.owner_role) // Default to seller if null
    const buyerDocs = documents.filter(d => d.owner_role === 'buyer')

    const renderDocList = (docs, title) => (
        <div className="space-y-3 mb-6">
            <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">{title}</h4>
            {docs.length === 0 ? (
                <p className="text-zinc-500 text-sm italic">No documents required.</p>
            ) : (
                docs.map(doc => (
                    <div
                        key={doc.id}
                        onClick={() => setSelectedTask(doc)}
                        className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all group cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    {doc.status === 'completed' ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-yellow-500" />
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors">{doc.title}</h4>
                                        {doc.is_optional && (
                                            <Badge variant="outline" className="text-[10px] border-zinc-700 text-zinc-500">Optional</Badge>
                                        )}
                                    </div>
                                    <Badge variant="secondary" className="text-[10px] mt-1 bg-zinc-800 text-zinc-400">{doc.document_type}</Badge>
                                </div>
                            </div>

                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                {doc.file_url && (
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => window.open(doc.file_url, '_blank')}>
                                        <Download className="w-4 h-4" />
                                    </Button>
                                )}

                                {/* Upload Button Logic */}
                                <div className="relative">
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={(e) => handleFileUpload(doc.id, e.target.files[0])}
                                        disabled={uploadingDocId === doc.id}
                                    />
                                    <Button size="sm" variant="outline" className="text-xs h-8 border-zinc-700 hover:bg-zinc-800 hover:text-white" disabled={uploadingDocId === doc.id}>
                                        {uploadingDocId === doc.id ? (
                                            <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                        ) : (
                                            <Upload className="w-3 h-3 mr-2" />
                                        )}
                                        {doc.file_url ? 'Re-upload' : 'Upload'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-zinc-500 pl-8 line-clamp-2">
                            {doc.description}
                        </p>
                    </div>
                ))
            )}
        </div>
    )

    const renderTabContent = () => {
        switch (activeTab) {
            case 'negotiating':
                return (
                    <Card className="bg-zinc-900 border-zinc-800 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <FileText className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Order Details</h3>
                                <p className="text-zinc-400 text-sm">Review the items and total amount.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {deal.items && deal.items.length > 0 ? (
                                deal.items.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center py-3 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 px-2 rounded-lg transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-zinc-800 rounded-md flex items-center justify-center">
                                                <Package className="w-5 h-5 text-zinc-500" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{item.name}</p>
                                                <p className="text-sm text-zinc-500">Qty: {item.quantity} × ${item.price_per_unit}</p>
                                            </div>
                                        </div>
                                        <p className="text-white font-medium font-mono">
                                            ${(item.quantity * item.price_per_unit).toLocaleString()}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 border-2 border-dashed border-zinc-800 rounded-xl">
                                    <p className="text-zinc-500 text-sm">No items added yet.</p>
                                </div>
                            )}
                            <Separator className="bg-zinc-800 my-4" />

                            {/* Shipping Estimate */}
                            <div className="bg-zinc-950/50 p-4 rounded-lg border border-zinc-800/50 mb-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Truck className="w-4 h-4 text-blue-500" />
                                    <h4 className="text-sm font-medium text-white">Shipping Estimate</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-zinc-500 text-xs">Origin</p>
                                        <p className="text-zinc-300">Jakarta, Indonesia</p>
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 text-xs">Destination</p>
                                        <p className="text-zinc-300">{deal.contact?.buyer?.country || "International"}</p>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-zinc-800/50 flex justify-between items-center">
                                    <span className="text-zinc-400 text-xs">Estimated Cost</span>
                                    <span className="text-zinc-300 font-mono">
                                        ${(50 + (deal.items?.reduce((acc, item) => acc + item.quantity, 0) || 0) * 5).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2 px-2">
                                <span className="text-zinc-400">Subtotal</span>
                                <span className="text-xl font-bold text-zinc-300">${deal.total_amount?.toLocaleString() || 0}</span>
                            </div>
                            <div className="flex justify-between items-center pt-1 px-2">
                                <span className="text-zinc-400">Est. Total</span>
                                <span className="text-2xl font-bold text-white">
                                    ${((deal.total_amount || 0) + (50 + (deal.items?.reduce((acc, item) => acc + item.quantity, 0) || 0) * 5)).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </Card>
                )
            case 'sealed':
                return (
                    <Card className="bg-zinc-900 border-zinc-800 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Compliance Documents</h3>
                                <p className="text-zinc-400 text-sm">Required documents for international shipping.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {documents.length === 0 ? (
                                <div className="col-span-2 text-center py-12 bg-zinc-950/50 rounded-xl border border-zinc-800">
                                    <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                                    <p className="text-zinc-400 font-medium">No documents generated yet</p>
                                    <p className="text-zinc-600 text-sm mt-1">Documents will appear here after the deal is sealed.</p>
                                </div>
                            ) : (
                                <>
                                    <div>{renderDocList(sellerDocs, "Seller's Tasks")}</div>
                                    <div>{renderDocList(buyerDocs, "Buyer's Tasks")}</div>
                                </>
                            )}
                        </div>
                    </Card>
                )
            case 'payment_pending':
                return (
                    <Card className="bg-zinc-900 border-zinc-800 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <CreditCard className="w-6 h-6 text-purple-500" />
                            </div>


                            <div>
                                <h3 className="font-bold text-white text-lg">Payment Information</h3>
                                <p className="text-zinc-400 text-sm">Transfer details for the transaction.</p>
                            </div>
                        </div>

                        <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                                <span className="text-zinc-400">Bank Name</span>
                                <span className="text-white font-medium">Bank Central Asia (BCA)</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                                <span className="text-zinc-400">Account Number</span>
                                <span className="text-white font-mono font-bold text-lg tracking-wider">8273 9283 1234</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                                <span className="text-zinc-400">Account Name</span>
                                <span className="text-white font-medium">PT. ShipPal Export</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-zinc-400">SWIFT Code</span>
                                <span className="text-white font-mono">CENAIDJA</span>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-900/50 rounded-lg flex gap-3">
                            <div className="w-1 h-full bg-blue-500 rounded-full" />
                            <div>
                                <h4 className="text-blue-400 font-bold text-sm mb-1">Payment Instructions</h4>
                                <p className="text-blue-200/70 text-xs">
                                    Please include the Deal ID <strong>#{deal.id.slice(0, 8)}</strong> in your transfer reference.
                                    Payment verification typically takes 1-2 business days.
                                </p>
                            </div>
                        </div>

                        {/* Shipping Details */}
                        <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 space-y-4 mt-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Truck className="w-4 h-4 text-blue-500" />
                                <h4 className="text-sm font-medium text-white">Shipping Details</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-zinc-500 text-xs">From</p>
                                    <p className="text-white text-sm">{deal.shipping_origin || "Jakarta, Indonesia"}</p>
                                </div>
                                <div>
                                    <p className="text-zinc-500 text-xs">To</p>
                                    <p className="text-white text-sm">{deal.shipping_destination || deal.contact?.buyer?.country || "International"}</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-zinc-800/50 space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-zinc-400">Subtotal</span>
                                    <span className="text-zinc-300">${deal.total_amount?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-zinc-400">Shipping Cost</span>
                                    <span className="text-zinc-300">${deal.shipping_cost?.toLocaleString() || "0"}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-zinc-800/50">
                                    <span className="text-zinc-400 font-medium">Total to Pay</span>
                                    <span className="text-xl font-bold text-white">${((deal.total_amount || 0) + (deal.shipping_cost || 0)).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                )
            default:
                return (
                    <Card className="bg-zinc-900 border-zinc-800 p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <div className="w-2 h-2 bg-zinc-500 rounded-full animate-pulse" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Step Not Reached</h3>
                        <p className="text-zinc-400">This step is not yet active for this deal.</p>
                    </Card>
                )
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-zinc-800 text-zinc-400 hover:text-white">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-white">Deal #{deal.id.slice(0, 8)}</h1>
                        <Badge variant="outline" className={cn(
                            "uppercase text-[10px] tracking-wider",
                            deal.status === 'completed' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        )}>
                            {deal.status.replace('_', ' ')}
                        </Badge>
                    </div>
                    <p className="text-zinc-400 text-sm">Created on {new Date(deal.created_at).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Sidebar: Progress Tabs */}
                <div className="lg:col-span-3 space-y-2">
                    <div className="bg-zinc-900/50 rounded-xl p-2 border border-zinc-800/50 backdrop-blur-sm sticky top-6">
                        {STEPS.map((step, index) => {
                            const isActive = activeTab === step.id
                            const isCompleted = index < currentStepIndex
                            const isCurrent = index === currentStepIndex
                            const Icon = step.icon

                            return (
                                <button
                                    key={step.id}
                                    onClick={() => setActiveTab(step.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left relative overflow-hidden group",
                                        isActive ? "bg-zinc-800 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                                    )}
                                >
                                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />}

                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors",
                                        isActive ? "bg-blue-500 text-white" :
                                            isCompleted ? "bg-green-900/30 text-green-500" : "bg-zinc-800"
                                    )}>
                                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                                    </div>

                                    <div className="flex-1">
                                        <p className={cn("text-sm font-medium", isActive && "text-blue-400")}>{step.label}</p>
                                        {isCurrent && <p className="text-[10px] text-zinc-500">In Progress</p>}
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="lg:col-span-9">
                    {renderTabContent()}
                </div>
            </div>
            {/* Task Detail Modal */}
            <Dialog open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-md">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            {selectedTask?.status === 'completed' ? (
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                            ) : (
                                <Circle className="w-6 h-6 text-yellow-500" />
                            )}
                            <DialogTitle className="text-xl">{selectedTask?.title}</DialogTitle>
                        </div>
                        <DialogDescription className="text-zinc-400">
                            {selectedTask?.document_type} • {selectedTask?.is_optional ? 'Optional' : 'Required'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Description</h4>
                            <p className="text-sm text-zinc-300 leading-relaxed">
                                {selectedTask?.description}
                            </p>
                        </div>

                        {selectedTask?.file_url && (
                            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-8 h-8 text-blue-500" />
                                    <div>
                                        <p className="text-sm font-medium text-white">Attached Document</p>
                                        <p className="text-xs text-zinc-500">Click to view or download</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" onClick={() => window.open(selectedTask.file_url, '_blank')} className="border-zinc-700 hover:bg-zinc-800 hover:text-white">
                                    <Download className="w-4 h-4 mr-2" />
                                    View
                                </Button>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="flex-col sm:flex-row gap-2">
                        <div className="relative w-full sm:w-auto">
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => handleFileUpload(selectedTask.id, e.target.files[0])}
                                disabled={uploadingDocId === selectedTask?.id}
                            />
                            <Button className="w-full bg-blue-600 hover:bg-blue-500" disabled={uploadingDocId === selectedTask?.id}>
                                {uploadingDocId === selectedTask?.id ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                    <Upload className="w-4 h-4 mr-2" />
                                )}
                                {selectedTask?.file_url ? 'Upload New Version' : 'Upload Document'}
                            </Button>
                        </div>
                        <Button variant="ghost" onClick={() => setSelectedTask(null)} className="hover:bg-zinc-800">
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
