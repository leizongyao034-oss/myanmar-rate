const { readData, writeData, json, requireAdmin } = require('./_store');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return json(res, 200, { ok: true });

  if (!requireAdmin(req)) {
    return json(res, 401, { ok: false, error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const data = readData();
    return json(res, 200, { ok: true, data });
  }

  if (req.method === 'POST') {
    try {
      const body = await new Promise((resolve, reject) => {
        let buf = '';
        req.on('data', c => (buf += c));
        req.on('end', () => {
          try { resolve(JSON.parse(buf || '{}')); } catch (e) { reject(e); }
        });
      });
      const next = writeData(body);
      return json(res, 200, { ok: true, data: next });
    } catch (e) {
      return json(res, 400, { ok: false, error: 'Bad JSON' });
    }
  }

  return json(res, 405, { ok: false, error: 'Method Not Allowed' });
};
