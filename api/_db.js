const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY;

function ready() {
  return Boolean(url && key);
}

async function supabaseFetch(path, options = {}) {
  if (!ready()) return null;
  const response = await fetch(`${url}/rest/v1${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...(options.headers || {})
    }
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Supabase request failed: ${response.status}`);
  }
  return response.json();
}

async function getSettings() {
  try {
    const rows = await supabaseFetch('/settings?id=eq.main&select=*');
    return rows && rows[0] ? rows[0].data : null;
  } catch (e) {
    return null;
  }
}

async function saveSettings(payload) {
  if (!ready()) return null;
  const body = JSON.stringify({ id: 'main', data: payload, updated_at: new Date().toISOString() });
  await supabaseFetch('/settings?id=eq.main', {
    method: 'PATCH',
    body
  });
  return payload;
}

module.exports = { getSettings, saveSettings };
