"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Upload, FileText, Download, Loader2 } from "lucide-react"

export function TaskDetailModal({ selectedTask, setSelectedTask, handleFileUpload, uploadingDocId, userRole }) {
    if (!selectedTask) return null

    return (
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
                    {(selectedTask?.owner_role || 'seller') === userRole && (
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
                    )}
                    <Button variant="ghost" onClick={() => setSelectedTask(null)} className="hover:bg-zinc-800">
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
