"use client"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, FileText } from "lucide-react"

export function DealOrderDetails({ deal }) {
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
}
