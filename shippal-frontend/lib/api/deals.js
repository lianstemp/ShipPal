import { createClient } from "@/lib/supabase/client"

const supabase = createClient()
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const dealsApi = {
    async getAll(userId) {
        const { data, error } = await supabase
            .from('deals')
            .select('*, deal_items(name)')
            .order('created_at', { ascending: false })
        
        if (error) throw error
        
        // Map to include a display title
        return data.map(deal => ({
            ...deal,
            title: deal.deal_items?.[0]?.name || 'Untitled Deal'
        }))
    },

    async create(contactId) {
        const res = await fetch(`${BACKEND_URL}/api/deals/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contact_id: contactId })
        })
        if (!res.ok) throw new Error("Failed to create deal")
        return res.json()
    },

    async seal(dealId) {
        const res = await fetch(`${BACKEND_URL}/api/deals/${dealId}/seal`, {
            method: "POST"
        })
        if (!res.ok) throw new Error("Failed to seal deal")
        return res.json()
    },

    async addItems(dealId, items) {
        const res = await fetch(`${BACKEND_URL}/api/deals/${dealId}/items`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(items)
        })
        if (!res.ok) throw new Error("Failed to add items")
        return res.json()
    },

    async get(dealId) {
        const res = await fetch(`${BACKEND_URL}/api/deals/${dealId}`)
        if (!res.ok) throw new Error("Failed to fetch deal")
        return res.json()
    },

    async updateItem(itemId, pricePerUnit) {
        const res = await fetch(`${BACKEND_URL}/api/deals/items/${itemId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price_per_unit: pricePerUnit })
        })
        if (!res.ok) throw new Error("Failed to update item")
        return res.json()
    }
}

export const chatApi = {
    async getMessages(contactId) {
        const res = await fetch(`${BACKEND_URL}/api/chat/${contactId}`)
        if (!res.ok) throw new Error("Failed to fetch messages")
        return res.json()
    },

    async sendMessage(contactId, senderId, content) {
        const res = await fetch(`${BACKEND_URL}/api/chat/message`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contact_id: contactId, sender_id: senderId, content })
        })
        if (!res.ok) throw new Error("Failed to send message")
        return res.json()
    }
}
