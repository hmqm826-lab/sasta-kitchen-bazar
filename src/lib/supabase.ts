import { createClient } from '@supabase/supabase-js';

export const ADMIN_EMAIL = 'hmqm826@gmail.com';

export const supabase = createClient(
  'https://ogwbnxjfrrtdaywiwdpi.supabase.co',
  'sb_publishable_a66ony_a36uA-5fCcg6tUA_dkWIVI_c'
);
