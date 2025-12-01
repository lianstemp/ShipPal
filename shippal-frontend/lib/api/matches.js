import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

export const matchesApi = {
    async getAll(userId) {
        // If userId is provided, use it. Otherwise fetch from auth.
        let uid = userId
        if (!uid) {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("Unauthorized")
            uid = user.id
        }

        const { data, error } = await supabase
            .from('matches')
            .select(`
                *,
                product:products(*, profiles(*)),
                request:buying_requests(*, profiles(*)),
                buyer:profiles!buyer_id(*),
                seller:profiles!seller_id(*)
            `)
            .or(`buyer_id.eq.${uid},seller_id.eq.${uid}`)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    },

    async getById(id) {
        const { data, error } = await supabase
            .from('matches')
            .select(`
                *,
                product:products(*, profiles(*)),
                request:buying_requests(*, profiles(*)),
                buyer:profiles!buyer_id(*),
                seller:profiles!seller_id(*)
            `)
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    },

    async getPendingIncoming(userId, role) {
        let query = supabase
            .from('matches')
            .select(`
                *,
                product:products(*, profiles(*)),
                request:buying_requests(*, profiles(*)),
                buyer:profiles!buyer_id(*),
                seller:profiles!seller_id(*)
            `)
            .eq('status', 'pending')

        if (role === 'buyer') {
            // Buyer sees matches where Seller liked their Request
            query = query.eq('buyer_id', userId).not('request_id', 'is', null)
        } else {
            // Seller sees matches where Buyer liked their Product
            query = query.eq('seller_id', userId).not('product_id', 'is', null)
        }

        const { data, error } = await query
        if (error) throw error
        return data
    },

    async updateStatus(id, status) {
        const { data, error } = await supabase
            .from('matches')
            .update({ status })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    }
}
