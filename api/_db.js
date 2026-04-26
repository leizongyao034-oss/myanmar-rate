const { createClient } = require('@supabase/supabase-js');

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY;

let supabase = null;
if (url && key) {
  supabase = createClient(url, key);
}

async function getSettings() {
  if (!supabase) return null;
  const { data, error } = await supabase.from('settings').select('*').eq('id','main').single();
  if (error) return null;
  return data?.data || null;
}

async function saveSettings(payload) {
  if (!supabase) return null;
  const { error } = await supabase.from('settings').upsert({ id:'main', data: payload });
  if (error) throw error;
  return payload;
}

module.exports = { supabase, getSettings, saveSettings };
