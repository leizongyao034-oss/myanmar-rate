const { readData, json } = require('./_store');
const { getSettings } = require('./_db');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return json(res, 200, { ok: true });

  let data = await getSettings();

  if (!data) {
    data = readData();
  }

  return json(res, 200, {
    ok: true,
    updatedAt: new Date().toISOString(),
    rates: data.rates,
    notice: data.notice
  });
};
