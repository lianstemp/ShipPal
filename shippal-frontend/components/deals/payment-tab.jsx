"use client"

import { Card } from "@/components/ui/card"
import { CreditCard, Truck } from "lucide-react"

export function DealPayment({ deal }) {
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
}
