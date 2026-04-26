async function fetchLiveRates() {
  const url = process.env.EXCHANGE_API_URL || 'https://open.er-api.com/v6/latest/MMK';
  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error('Live rate provider failed');
  const data = await res.json();
  const r = data.rates || {};
  if (!r.USD || !r.THB || !r.CNY) throw new Error('Missing required live pairs');

  const officialUsd = 1 / r.USD;
  const officialThb = 1 / r.THB;
  const officialCny = 1 / r.CNY;

  const usdMultiplier = Number(process.env.USD_MARKET_MULTIPLIER || 2.0);
  const thbMultiplier = Number(process.env.THB_MARKET_MULTIPLIER || 2.0);
  const cnyMultiplier = Number(process.env.CNY_MARKET_MULTIPLIER || 2.0);

  const usd = officialUsd * usdMultiplier;
  const thb = officialThb * thbMultiplier;
  const cny = officialCny * cnyMultiplier;

  return {
    usd: { name: 'USD', full: 'US Dollar', value: Math.round(usd), change: 0, trend: 'up', spread: 25 },
    thb: { name: 'THB', full: 'Thai Baht', value: Math.round(thb), change: 0, trend: 'up', spread: 2 },
    rmb: { name: 'RMB', full: 'Chinese Yuan', value: Math.round(cny), change: 0, trend: 'up', spread: 6 }
  };
}

module.exports = { fetchLiveRates };
