"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { productsApi } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, Package, MoreVertical } from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const loadProducts = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                try {
                    const allProducts = await productsApi.getAll()
                    // Filter by seller_id
                    const myProducts = allProducts.filter(p => p.seller_id === user.id)
                    setProducts(myProducts)
                } catch (error) {
                    console.error("Error loading products:", error)
                }
            }
            setLoading(false)
        }
        loadProducts()
    }, [supabase])

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">My Products</h1>
                    <p className="text-zinc-400">Manage your product listings</p>
                </div>
                <Link href="/dashboard/products/new">
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                    </Button>
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <Package className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No products listed</h3>
                    <p className="text-zinc-400 mb-6">Start selling by listing your first product.</p>
                    <Link href="/dashboard/products/new">
                        <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
                            List a Product
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Card key={product.id} className="bg-zinc-900 border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-colors">
                            <div className="h-48 bg-zinc-800 relative">
                                {product.images && product.images.length > 0 ? (
                                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Package className="w-12 h-12 text-zinc-700" />
                                    </div>
                                )}
                            </div>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-white line-clamp-1">{product.name}</h3>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-zinc-400 text-sm line-clamp-2 mb-4">
                                    {product.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {product.tags && product.tags.map((tag, i) => (
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
        </div>
    )
}
