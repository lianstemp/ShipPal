import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

export const matchesApi = {
    async getAll() {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("Unauthorized")

        const { data, error } = await supabase
            .from('matches')
            .select(`
                *,
                product:products(*, profiles(*)),
                request:buying_requests(*, profiles(*)),
                buyer:profiles!buyer_id(*),
                seller:profiles!seller_id(*)
            `)
            .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    },

    async getById(id) {
        const { data, error } = await supabase
            .from('matches')
            .select(`
            *,
            product: products(*),
                request: buying_requests(*),
                    buyer: profiles!matches_buyer_id_fkey(*),
                        seller: profiles!matches_seller_id_fkey(*)
                            `)
            .eq('id', id)
            .single()
        if (error) throw error
        return data
    }
}
