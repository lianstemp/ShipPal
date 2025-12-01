"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function RequestModal({ open, onOpenChange, request, onSuccess }) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        target_price: "",
        required_qty: "",
        destination_country: "",
        deadline: ""
    })

    useEffect(() => {
        if (request) {
            setFormData({
                title: request.title || "",
                description: request.description || "",
                category: request.category || "",
                target_price: request.target_price || "",
                required_qty: request.required_qty || "",
                destination_country: request.destination_country || "",
                deadline: request.deadline || ""
            })
        } else {
            setFormData({
                title: "",
                description: "",
                category: "",
                target_price: "",
                required_qty: "",
                destination_country: "",
                deadline: ""
            })
        }
    }, [request, open])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) throw new Error("Unauthorized")

            const payload = {
                ...formData,
                target_price: parseFloat(formData.target_price),
                required_qty: parseFloat(formData.required_qty),
                buyer_id: user.id
            }

            if (request?.id) {
                // Update
                const { error } = await supabase
                    .from('buying_requests')
                    .update(payload)
                    .eq('id', request.id)
                if (error) throw error
            } else {
                // Create
                const { error } = await supabase
                    .from('buying_requests')
                    .insert([payload])
                if (error) throw error
            }

            onSuccess()
            onOpenChange(false)
        } catch (error) {
            console.error("Error saving request:", error)
            alert("Failed to save request")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{request ? "Edit Request" : "Create Buying Request"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-2">
                        <Label>Title</Label>
                        <Input
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="bg-zinc-950 border-zinc-800"
                            placeholder="e.g. Looking for 500kg Rattan Chairs"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Description</Label>
                        <Textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="bg-zinc-950 border-zinc-800 min-h-[100px]"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Category</Label>
                            <Input
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className="bg-zinc-950 border-zinc-800"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Target Price (USD)</Label>
                            <Input
                                type="number"
                                value={formData.target_price}
                                onChange={e => setFormData({ ...formData, target_price: e.target.value })}
                                className="bg-zinc-950 border-zinc-800"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Required Quantity</Label>
                            <Input
                                type="number"
                                value={formData.required_qty}
                                onChange={e => setFormData({ ...formData, required_qty: e.target.value })}
                                className="bg-zinc-950 border-zinc-800"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Destination Country</Label>
                            <Input
                                value={formData.destination_country}
                                onChange={e => setFormData({ ...formData, destination_country: e.target.value })}
                                className="bg-zinc-950 border-zinc-800"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Deadline</Label>
                        <Input
                            type="date"
                            value={formData.deadline}
                            onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                            className="bg-zinc-950 border-zinc-800"
                            required
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-500" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {request ? "Update Request" : "Create Request"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
