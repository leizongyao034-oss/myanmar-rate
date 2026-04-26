const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join('/tmp', 'myanmar-rate-data.json');

const defaultData = {
  lang: 'en',
  views: 0,
  notice: 'Commercial reference rates only. Contact us for exchange cooperation, advertising and API partnership.',
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
    rmb: { name: 'RMB', full: 'Chinese Yuan', value: 610, change: 0.4, trend: 'up', spread: 6 },
    thb: { name: 'THB', full: 'Thai Baht', value: 115, change: -0.3, trend: 'down', spread: 2 },
    usdt: { name: 'USDT', full: 'Tether', value: 4235, change: 0.8, trend: 'up', spread: 30 },
    sgd: { name: 'SGD', full: 'Singapore Dollar', value: 3130, change: 0.2, trend: 'up', spread: 20 }
  }
};

function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) return { ...defaultData };
    return { ...defaultData, ...JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) };
  } catch (e) {
    return { ...defaultData };
  }
}

function writeData(data) {
  const next = { ...defaultData, ...data, updatedAt: new Date().toISOString() };
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

module.exports = { defaultData, readData, writeData, json, requireAdmin };
