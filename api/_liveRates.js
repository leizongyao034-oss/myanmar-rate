async function fetchLiveRates() {
  const url = process.env.EXCHANGE_API_URL || 'https://open.er-api.com/v6/latest/MMK';
  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error('Live rate provider failed');
  const data = await res.json();
  const r = data.rates || {};
  if (!r.USD || !r.THB || !r.CNY) throw new Error('Missing required live pairs');

  const usd = 1 / r.USD;
  const thb = r.THB / r.USD ? usd / (1 / r.THB) : 1 / r.THB;
  const cny = 1 / r.CNY;

  return {
    usd: { name: 'USD', full: 'US Dollar', value: Math.round(usd), change: 0, trend: 'up', spread: 0 },
    thb: { name: 'THB', full: 'Thai Baht', value: Math.round(1 / r.THB), change: 0, trend: 'up', spread: 0 },
    rmb: { name: 'RMB', full: 'Chinese Yuan', value: Math.round(cny), change: 0, trend: 'up', spread: 0 }
  };
}

module.exports = { fetchLiveRates };
