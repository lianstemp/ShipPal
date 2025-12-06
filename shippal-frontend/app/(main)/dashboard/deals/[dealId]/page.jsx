"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Loader2, FileText, CheckCircle2, CreditCard, Truck } from "lucide-react"

import { DealHeader } from "@/components/deals/header"
import { DealProgressSidebar } from "@/components/deals/progress-sidebar"
import { DealOrderDetails } from "@/components/deals/order-details"
import { DealCompliance } from "@/components/deals/compliance-tab"
import { DealPayment } from "@/components/deals/payment-tab"
import { TaskDetailModal } from "@/components/deals/task-detail-modal"

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

    const userRole = deal && user ? (deal.contact.buyer_id === user.id ? 'buyer' : (deal.contact.seller_id === user.id ? 'seller' : null)) : null

    const renderTabContent = () => {
        switch (activeTab) {
            case 'negotiating':
                return <DealOrderDetails deal={deal} />
            case 'sealed':
                return (
                    <DealCompliance
                        documents={documents}
                        handleFileUpload={handleFileUpload}
                        uploadingDocId={uploadingDocId}
                        setSelectedTask={setSelectedTask}
                        userRole={userRole}
                    />
                )
            case 'payment_pending':
                return <DealPayment deal={deal} />
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
            <DealHeader deal={deal} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Sidebar: Progress Tabs */}
                <div className="lg:col-span-3 space-y-2">
                    <DealProgressSidebar
                        steps={STEPS}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        currentStepIndex={currentStepIndex}
                    />
                </div>

                {/* Right Content Area */}
                <div className="lg:col-span-9">
                    {renderTabContent()}
                </div>
            </div>

            <TaskDetailModal
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                handleFileUpload={handleFileUpload}
                uploadingDocId={uploadingDocId}
                userRole={userRole}
            />
        </div>
    )
}
