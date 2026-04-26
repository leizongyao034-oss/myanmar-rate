const { readData, json, normalizeData } = require('./_store');
const { getSettings } = require('./_db');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return json(res, 200, { ok: true });

  let data = await getSettings();

  if (!data) {
    data = readData();
  }

  data = normalizeData(data);

  return json(res, 200, {
    ok: true,
    updatedAt: new Date().toISOString(),
    rates: data.rates,
    notice: data.notice
  });
};
