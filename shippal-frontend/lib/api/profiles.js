import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

export const profilesApi = {
    async getById(id) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    }
}
