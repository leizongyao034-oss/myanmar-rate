const { readData, json, normalizeData } = require('./_store');
const { getSettings } = require('./_db');
const { fetchLiveRates } = require('./_liveRates');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return json(res, 200, { ok: true });

  try {
    const live = await fetchLiveRates();
    return json(res, 200, {
      ok: true,
      source: 'live',
      updatedAt: new Date().toISOString(),
      rates: live
    });
  } catch (e) {
    let data = await getSettings();
    if (!data) data = readData();
    data = normalizeData(data);

    return json(res, 200, {
      ok: true,
      source: 'fallback',
      updatedAt: new Date().toISOString(),
      rates: data.rates,
      notice: data.notice
    });
  }
};
