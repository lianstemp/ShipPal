"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Package, Loader2, Trash2, Pencil, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function DealPanel({
    deal,
    isBuyer,
    isSeller,
    router,
    handleSealDeal,
    sealing,
    handleDeleteItem,
    handleUpdatePrice,
    editingItemId,
    setEditingItemId,
    editPrice,
    setEditPrice,
    isAddItemsOpen,
    setIsAddItemsOpen,
    products,
    selectedProduct,
    setSelectedProduct,
    quantity,
    setQuantity,
    price,
    setPrice,
    handleAddItemSubmit,
    isAddingItem
}) {
    return (
        <div className="w-80 border-l border-zinc-800 bg-zinc-950/30 p-4 hidden xl:block overflow-y-auto">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                Deal Room
            </h3>

            {/* Deal Status */}
            <div className="mb-6 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50 backdrop-blur-sm">
                <h4 className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-2">Current Status</h4>
                <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", deal?.status === 'completed' ? "bg-green-500" : "bg-blue-500 animate-pulse")} />
                    <span className={cn("font-bold uppercase tracking-wide text-sm", deal?.status === 'completed' ? "text-green-500" : "text-blue-500")}>
                        {deal?.status?.replace('_', ' ') || "Negotiating"}
                    </span>
                </div>
            </div>

            {/* Deal Items */}
            {deal && deal.items && deal.items.length > 0 && (
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Items</h4>
                        <span className="text-[10px] text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">{deal.items.length}</span>
                    </div>
                    <div className="space-y-2">
                        {deal.items.map((item, i) => (
                            <div key={i} className="bg-zinc-900/80 p-3 rounded-xl border border-zinc-800 text-sm hover:border-zinc-700 transition-colors group">
                                <div className="flex justify-between font-medium text-white mb-1">
                                    <span className="line-clamp-1">{item.name}</span>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {/* Delete Item - Only for Buyer */}
                                        {deal.status === 'negotiating' && isBuyer && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleDeleteItem(item.id)
                                                }}
                                                className="text-zinc-500 hover:text-red-500 transition-colors p-1 hover:bg-red-500/10 rounded"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Price and Quantity */}
                                <div className="flex justify-between items-center text-zinc-500 text-xs mt-2">
                                    <span className="bg-zinc-950 px-1.5 py-0.5 rounded text-zinc-400">Qty: {item.quantity}</span>

                                    {/* Price Negotiation for Seller */}
                                    {editingItemId === item.id ? (
                                        <div className="flex items-center gap-1">
                                            <Input
                                                type="number"
                                                value={editPrice}
                                                onChange={e => setEditPrice(e.target.value)}
                                                className="w-16 h-6 text-xs p-1 bg-zinc-950 border-zinc-700"
                                            />
                                            <button onClick={() => handleUpdatePrice(item.id)} className="text-green-500 hover:text-green-400"><Check className="w-3 h-3" /></button>
                                            <button onClick={() => setEditingItemId(null)} className="text-red-500 hover:text-red-400"><X className="w-3 h-3" /></button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <span>${item.price_per_unit}</span>
                                            {deal.status === 'negotiating' && isSeller && (
                                                <button
                                                    onClick={() => {
                                                        setEditingItemId(item.id)
                                                        setEditPrice(item.price_per_unit)
                                                    }}
                                                    className="text-zinc-500 hover:text-blue-400"
                                                >
                                                    <Pencil className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="text-right text-xs text-zinc-400 mt-2 pt-2 border-t border-zinc-800/50">
                                    Total: <span className="text-white font-medium">${(item.quantity * item.price_per_unit).toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                        <div className="pt-4 mt-4 border-t border-zinc-800 flex justify-between items-end">
                            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Total Amount</span>
                            <span className="text-xl font-bold text-white">${deal.total_amount?.toLocaleString() || 0}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="space-y-3 mt-auto">
                {deal && (
                    <Button
                        variant="secondary"
                        className="w-full justify-start text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 h-10 rounded-xl"
                        onClick={() => router.push(`/dashboard/deals/${deal.id}`)}
                    >
                        <FileText className="w-4 h-4 mr-2" />
                        View Full Deal Details
                    </Button>
                )}

                {/* Add Items - Only for Buyer */}
                {isBuyer && (
                    <Dialog open={isAddItemsOpen} onOpenChange={setIsAddItemsOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-start border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed h-10 rounded-xl"
                                disabled={deal && deal.status !== 'negotiating'}
                            >
                                <Package className="w-4 h-4 mr-2" />
                                Add Items
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:rounded-2xl">
                            <DialogHeader>
                                <DialogTitle>Add Item to Deal</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Product</Label>
                                    <Select onValueChange={(val) => {
                                        setSelectedProduct(val)
                                        const p = products.find(prod => prod.id === val)
                                        if (p) setPrice(p.price_per_unit || 0)
                                    }}>
                                        <SelectTrigger className="bg-zinc-950 border-zinc-800 rounded-xl h-10">
                                            <SelectValue placeholder="Select a product" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white rounded-xl">
                                            {products.map(p => (
                                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Quantity</Label>
                                        <Input
                                            type="number"
                                            value={quantity}
                                            onChange={e => setQuantity(e.target.value)}
                                            className="bg-zinc-950 border-zinc-800 rounded-xl h-10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Price per Unit</Label>
                                        <Input
                                            type="number"
                                            value={price}
                                            readOnly // Fixed price for buyer
                                            className="bg-zinc-950 border-zinc-800 opacity-70 cursor-not-allowed rounded-xl h-10"
                                        />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleAddItemSubmit} disabled={isAddingItem} className="bg-blue-600 hover:bg-blue-500 rounded-xl">
                                    {isAddingItem ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Adding...
                                        </>
                                    ) : (
                                        "Add Item"
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}

                {/* Seal Deal - Only for Buyer */}
                {isBuyer && (
                    <Button
                        onClick={handleSealDeal}
                        className="w-full bg-green-600 hover:bg-green-500 text-white disabled:opacity-50 disabled:cursor-not-allowed h-10 rounded-xl font-medium shadow-lg shadow-green-900/20"
                        disabled={!deal || (deal.status !== 'negotiating' && deal.status !== 'sealing') || !deal.items || deal.items.length === 0 || sealing || deal.status === 'sealing'}
                    >
                        {sealing || (deal && deal.status === 'sealing') ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Sealing...
                            </>
                        ) : (
                            <>
                                <FileText className="w-4 h-4 mr-2" />
                                {deal && deal.status !== 'negotiating' ? 'Deal Sealed' : 'Seal Deal'}
                            </>
                        )}
                    </Button>
                )}
            </div>
        </div>
    )
}
