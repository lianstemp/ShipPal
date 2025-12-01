import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

export const messagesApi = {
    async getByMatchId(matchId) {
        const { data, error } = await supabase
            .from('messages')
            .select(`
                *,
                sender:profiles!sender_id(full_name, avatar_url)
            `)
            .eq('match_id', matchId)
            .order('created_at', { ascending: true })

        if (error) throw error
        return data
    },

    async send(matchId, senderId, content) {
        const { data, error } = await supabase
            .from('messages')
            .insert([{
                match_id: matchId,
                sender_id: senderId,
                content_original: content,
                language_code: 'en' // Default for now
            }])
            .select()
            .single()

        if (error) throw error
        return data
    },

    subscribe(matchId, callback) {
        return supabase
            .channel(`match:${matchId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `match_id=eq.${matchId}`
            }, callback)
            .subscribe()
    }
}
