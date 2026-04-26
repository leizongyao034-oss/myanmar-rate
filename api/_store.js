const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join('/tmp', 'myanmar-rate-data.json');

const defaultData = {
  lang: 'en',
  views: 0,
  notice: 'Commercial reference rates only. USD, THB and RMB reference rates against MMK.',
  adEnabled: false,
  sideAdEnabled: false,
  adTitle: 'Premium Banner Advertising',
  adText: 'Advertise your exchange, brand or payment service here.',
  sideAdTitle: 'Brand Cooperation',
  sideAdText: 'Sponsor this market section.',
  telegram: 'https://t.me/',
  whatsapp: 'https://wa.me/',
  email: 'business@myanmar-rate.com',
  apiEnabled: true,
  apiUrl: '/api/rates',
  updatedAt: new Date().toISOString(),
  rates: {
    usd: { name: 'USD', full: 'US Dollar', value: 4210, change: 1.2, trend: 'up', spread: 25 },
    thb: { name: 'THB', full: 'Thai Baht', value: 115, change: -0.3, trend: 'down', spread: 2 },
    rmb: { name: 'RMB', full: 'Chinese Yuan', value: 610, change: 0.4, trend: 'up', spread: 6 }
  }
};

function normalizeData(data) {
  const next = { ...defaultData, ...data };
  const rates = next.rates || {};
  next.rates = {
    usd: rates.usd || defaultData.rates.usd,
    thb: rates.thb || defaultData.rates.thb,
    rmb: rates.rmb || defaultData.rates.rmb
  };
  return next;
}

function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) return normalizeData(defaultData);
    return normalizeData(JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')));
  } catch (e) {
    return normalizeData(defaultData);
  }
}

function writeData(data) {
  const next = normalizeData({ ...data, updatedAt: new Date().toISOString() });
  fs.writeFileSync(DATA_FILE, JSON.stringify(next, null, 2));
  return next;
}

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.end(JSON.stringify(body));
}

function requireAdmin(req) {
  const expected = process.env.ADMIN_PASSWORD || '123456';
  const auth = req.headers.authorization || '';
  return auth === `Bearer ${expected}`;
}

module.exports = { defaultData, normalizeData, readData, writeData, json, requireAdmin };
