const { readData, json } = require('./_store');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return json(res, 200, { ok: true });
  const data = readData();
  return json(res, 200, {
    ok: true,
    updatedAt: data.updatedAt,
    rates: data.rates,
    notice: data.notice
  });
};
