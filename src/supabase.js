import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nkgarsfpajysialzmtza.supabase.co";
const supabaseKey = "sb_publishable_DTERobQaHW6McOuJBUmP1w_htGjmq4G";

export const supabase = createClient(supabaseUrl, supabaseKey);
