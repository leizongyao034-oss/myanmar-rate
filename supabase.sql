create table if not exists public.settings (
  id text primary key default 'main',
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.rate_history (
  id bigserial primary key,
  pair text not null,
  value numeric not null,
  change numeric default 0,
  trend text default 'up',
  created_at timestamptz not null default now()
);

create table if not exists public.ad_clicks (
  id bigserial primary key,
  slot text not null,
  user_agent text,
  ip text,
  created_at timestamptz not null default now()
);

insert into public.settings (id, data)
values ('main', '{
  "lang":"en",
  "views":0,
  "notice":"Commercial reference rates only. Contact us for exchange cooperation, advertising and API partnership.",
  "adEnabled":false,
  "sideAdEnabled":false,
  "adTitle":"Premium Banner Advertising",
  "adText":"Advertise your exchange, brand or payment service here.",
  "sideAdTitle":"Brand Cooperation",
  "sideAdText":"Sponsor this market section.",
  "telegram":"https://t.me/",
  "whatsapp":"https://wa.me/",
  "email":"business@myanmar-rate.com",
  "apiEnabled":true,
  "apiUrl":"/api/rates",
  "rates":{
    "usd":{"name":"USD","full":"US Dollar","value":4210,"change":1.2,"trend":"up","spread":25},
    "rmb":{"name":"RMB","full":"Chinese Yuan","value":610,"change":0.4,"trend":"up","spread":6},
    "thb":{"name":"THB","full":"Thai Baht","value":115,"change":-0.3,"trend":"down","spread":2},
    "usdt":{"name":"USDT","full":"Tether","value":4235,"change":0.8,"trend":"up","spread":30},
    "sgd":{"name":"SGD","full":"Singapore Dollar","value":3130,"change":0.2,"trend":"up","spread":20}
  }
}'::jsonb)
on conflict (id) do nothing;
