"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/ui/image-upload"
import { Loader2 } from "lucide-react"
import { productsApi } from "@/lib/api"
import { createClient } from "@/lib/supabase/client"

export function ProductModal({ open, onOpenChange, product, onSuccess }) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        price_per_unit: "",
        moq: "",
        capacity_per_month: "",
        images: []
    })

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                description: product.description || "",
                category: product.category || "",
                price_per_unit: product.price_per_unit || "",
                moq: product.moq || "",
                capacity_per_month: product.capacity_per_month || "",
                images: product.images || []
            })
        } else {
            setFormData({
                name: "",
                description: "",
                category: "",
                price_per_unit: "",
                moq: "",
                capacity_per_month: "",
                images: []
            })
        }
    }, [product, open])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) throw new Error("Unauthorized")

            const payload = {
                ...formData,
                price_per_unit: parseFloat(formData.price_per_unit),
                moq: parseFloat(formData.moq),
                capacity_per_month: parseFloat(formData.capacity_per_month),
                seller_id: user.id
            }

            if (product?.id) {
                // Update
                const { error } = await supabase
                    .from('products')
                    .update(payload)
                    .eq('id', product.id)
                if (error) throw error
            } else {
                // Create
                const { error } = await supabase
                    .from('products')
                    .insert([payload])
                if (error) throw error
            }

            onSuccess()
            onOpenChange(false)
        } catch (error) {
            console.error("Error saving product:", error)
            alert("Failed to save product")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-2">
                        <Label>Product Name</Label>
                        <Input
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="bg-zinc-950 border-zinc-800"
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
                                placeholder="e.g. Spices, Seafood"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Price per Unit (USD)</Label>
                            <Input
                                type="number"
                                value={formData.price_per_unit}
                                onChange={e => setFormData({ ...formData, price_per_unit: e.target.value })}
                                className="bg-zinc-950 border-zinc-800"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>MOQ</Label>
                            <Input
                                type="number"
                                value={formData.moq}
                                onChange={e => setFormData({ ...formData, moq: e.target.value })}
                                className="bg-zinc-950 border-zinc-800"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Capacity per Month</Label>
                            <Input
                                type="number"
                                value={formData.capacity_per_month}
                                onChange={e => setFormData({ ...formData, capacity_per_month: e.target.value })}
                                className="bg-zinc-950 border-zinc-800"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Product Images</Label>
                        <ImageUpload
                            value={formData.images}
                            onChange={imgs => setFormData({ ...formData, images: imgs })}
                            maxFiles={5}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-500" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {product ? "Update Product" : "Create Product"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
