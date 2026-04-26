const { readData, writeData, json, requireAdmin, normalizeData } = require('./_store');
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
    const data = normalizeData(dbData || readData());
    return json(res, 200, { ok: true, source: dbData ? 'supabase' : 'fallback', data });
  }

  if (req.method === 'POST') {
    try {
      const body = normalizeData(await readBody(req));
      let next = await saveSettings(body);
      if (!next) next = writeData(body);
      return json(res, 200, { ok: true, data: normalizeData(next) });
    } catch (e) {
      return json(res, 400, { ok: false, error: e.message || 'Bad Request' });
    }
  }

  return json(res, 405, { ok: false, error: 'Method Not Allowed' });
};
