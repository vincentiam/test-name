import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
    const config = useRuntimeConfig()

    return createClient(config.public.SupabaseUrl, config.public.SupabaseKey,{
        auth: { persistSession: true }
    })
}