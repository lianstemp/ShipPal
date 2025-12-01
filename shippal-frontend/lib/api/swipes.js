import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

export const swipesApi = {
    async swipe(targetId, targetType, direction) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("Unauthorized")

        // 1. Record the swipe
        const { data: swipe, error } = await supabase
            .from('swipes')
            .insert([{
                swiper_id: user.id,
                target_id: targetId,
                target_type: targetType,
                direction: direction
            }])
            .select()
            .single()

        if (error) throw error

        // 2. Check for Match (Double Swipe)
        // If I swiped RIGHT, check if the other party also swiped RIGHT on ME (or my item)
        // Logic:
        // - If I am Buyer, I swiped RIGHT on a Product. 
        //   Check if the Seller of that Product swiped RIGHT on my Buying Request? 
        //   Wait, the logic in the schema is:
        //   "Tabel ini terisi ketika terjadi "Double Swipe" (Saling Like)"
        //   Usually in B2B:
        //   - Buyer swipes Product -> Seller gets notification -> Seller accepts/swipes Request?
        //   - OR: Buyer posts Request, Seller swipes Request.

        //   Let's simplify for MVP:
        //   If direction is 'right', we check if there is a reverse swipe?
        //   Actually, usually one party initiates.
        //   Let's assume:
        //   - Buyer swipes Product (Right) -> Creates a "Potential Match" or notifies Seller.
        //   - Seller swipes Request (Right) -> Creates a "Potential Match" or notifies Buyer.

        //   For the "Tinder" logic to work strictly:
        //   We need to know WHAT the other person swiped on.
        //   If I am Buyer, I swipe Product X. Does Seller of Product X swipe ME? Or my Request?
        //   The schema has `matches` linking `product_id` AND `request_id`.
        //   This implies a Match is between a specific Product and a specific Request.

        //   This is hard to do with just generic "Swipe".
        //   Let's implement a simpler flow for now:
        //   - If Swipe Right -> Check if we can auto-create a match or just log it.
        //   - For this Hackathon, let's say:
        //     If Buyer swipes Product Right -> Create a Match immediately (pending seller approval).
        //     If Seller swipes Request Right -> Create a Match immediately (pending buyer approval).

        if (direction === 'right') {
            return await this.createMatch(user.id, targetId, targetType)
        }

        return null
    },

    async createMatch(userId, targetId, targetType) {
        // Fetch details to populate match table
        let matchData = {
            status: 'pending',
        }

        if (targetType === 'product') {
            // User is Buyer
            const { data: product } = await supabase.from('products').select('seller_id').eq('id', targetId).single()
            matchData.buyer_id = userId
            matchData.seller_id = product.seller_id
            matchData.product_id = targetId
            // We don't have a request_id yet, maybe user selects one later?
        } else {
            // User is Seller
            const { data: request } = await supabase.from('buying_requests').select('buyer_id').eq('id', targetId).single()
            matchData.seller_id = userId
            matchData.buyer_id = request.buyer_id
            matchData.request_id = targetId
        }

        const { data: match, error } = await supabase
            .from('matches')
            .insert([matchData])
            .select()
            .single()

        if (error) {
            console.error("Error creating match:", error)
            // Ignore duplicate errors if match already exists
            return null
        }

        return match
    }
}
