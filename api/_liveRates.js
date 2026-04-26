function num(v, fallback) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function roundTo(v, step) {
  return Math.round(v / step) * step;
}

async function fetchLiveRates(settings = {}) {
  const url = process.env.EXCHANGE_API_URL || 'https://open.er-api.com/v6/latest/MMK';
  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error('Live rate provider failed');
  const data = await res.json();
  const r = data.rates || {};
  if (!r.USD || !r.THB || !r.CNY) throw new Error('Missing required live pairs');

  const officialUsd = 1 / r.USD;
  const officialThb = 1 / r.THB;
  const officialCny = 1 / r.CNY;

  const anchorUsd = num(settings.blackMarketUsd || process.env.BLACK_MARKET_USD, 4210);
  const anchorThb = num(settings.blackMarketThb || process.env.BLACK_MARKET_THB, 115);
  const anchorRmb = num(settings.blackMarketRmb || process.env.BLACK_MARKET_RMB, 610);

  const marketRatio = anchorUsd / officialUsd;
  const usd = anchorUsd;
  const thb = settings.blackMarketThb ? anchorThb : officialThb * marketRatio;
  const rmb = settings.blackMarketRmb ? anchorRmb : officialCny * marketRatio;

  return {
    usd: { name: 'USD', full: 'US Dollar', value: roundTo(usd, 5), change: 0, trend: 'up', spread: 25 },
    thb: { name: 'THB', full: 'Thai Baht', value: roundTo(thb, 1), change: 0, trend: 'up', spread: 2 },
    rmb: { name: 'RMB', full: 'Chinese Yuan', value: roundTo(rmb, 1), change: 0, trend: 'up', spread: 6 }
  };
}

module.exports = { fetchLiveRates };
