const { readData, writeData, json, requireAdmin } = require('./_store');
const { getSettings, saveSettings } = require('./_db');

function readBody(req) {
  return new Promise((resolve, reject) => {
    let buf = '';
    req.on('data', c => (buf += c));
    req.on('end', () => {
      try { resolve(JSON.parse(buf || '{}')); } catch (e) { reject(e); }
    });
  });
}

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return json(res, 200, { ok: true });

  if (!requireAdmin(req)) {
    return json(res, 401, { ok: false, error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const dbData = await getSettings();
    const data = dbData || readData();
    return json(res, 200, { ok: true, source: dbData ? 'supabase' : 'fallback', data });
  }

  if (req.method === 'POST') {
    try {
      const body = await readBody(req);
      let next = await saveSettings(body);
      if (!next) next = writeData(body);
      return json(res, 200, { ok: true, data: next });
    } catch (e) {
      return json(res, 400, { ok: false, error: e.message || 'Bad Request' });
    }
  }

  return json(res, 405, { ok: false, error: 'Method Not Allowed' });
};
