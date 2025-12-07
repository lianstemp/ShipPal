import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

export const requestsApi = {
    async getAll() {
        const { data, error } = await supabase
            .from('buying_requests')
            .select('*')
            .order('created_at', { ascending: false })
        if (error) throw error
        return data
    },

    async create(request) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("Unauthorized")

        const { data, error } = await supabase
            .from('buying_requests')
            .insert([{ ...request, buyer_id: user.id }])
            .select()
            .single()
        if (error) throw error
        return data
    },

    async getByUserId(userId) {
        const { data, error } = await supabase
            .from('buying_requests')
            .select('*')
            .eq('buyer_id', userId)
            .order('created_at', { ascending: false })
        if (error) throw error
        return data
    },

    async getUnswiped(userId) {
        // 1. Get IDs of requests already swiped by this user
        const { data: swipes, error: swipesError } = await supabase
            .from('swipes')
            .select('target_id')
            .eq('swiper_id', userId)
            .eq('target_type', 'request')

        if (swipesError) throw swipesError

        const swipedIds = swipes.map(s => s.target_id)

        // 2. Fetch requests not in swipedIds
        let query = supabase.from('buying_requests').select('*, profiles(full_name, company_name, country, avatar_url, images)')

        if (swipedIds.length > 0) {
            query = query.not('id', 'in', `(${swipedIds.join(',')})`)
        }

        const { data, error } = await query.limit(50)
        if (error) throw error

        // Randomize the order (Fisher-Yates Shuffle)
        if (data) {
            for (let i = data.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [data[i], data[j]] = [data[j], data[i]];
            }
        }

        return data
    }
}
