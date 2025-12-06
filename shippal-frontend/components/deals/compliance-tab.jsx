"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Upload, FileText, Download, Loader2 } from "lucide-react"

export function DealCompliance({ documents, handleFileUpload, uploadingDocId, setSelectedTask, userRole }) {

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
                                {(doc.owner_role || 'seller') === userRole && (
                                    <div className="relative">
                                        <input
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={(e) => handleFileUpload(doc.id, e.target.files[0])}
                                            disabled={uploadingDocId === doc.id}
                                        />
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="text-xs h-8 border-zinc-700 hover:bg-zinc-800 hover:text-white"
                                            disabled={uploadingDocId === doc.id}
                                        >
                                            {uploadingDocId === doc.id ? (
                                                <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                            ) : (
                                                <Upload className="w-3 h-3 mr-2" />
                                            )}
                                            {doc.file_url ? 'Re-upload' : 'Upload'}
                                        </Button>
                                    </div>
                                )}
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
}
