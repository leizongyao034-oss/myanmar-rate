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

create table if not exists public.users (
  id bigserial primary key,
  name text,
  email text unique not null,
  password_hash text not null,
  plan text not null default 'free',
  api_key text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.api_usage (
  id bigserial primary key,
  api_key text,
  endpoint text not null,
  ip text,
  created_at timestamptz not null default now()
);

insert into public.settings (id, data)
values ('main', '{
  "lang":"",
  "views":0,
  "notice":"Commercial reference rates only. USD, THB and RMB reference rates against MMK.",
  "adEnabled":false,
  "sideAdEnabled":false,
  "adTitle":"Premium Banner Advertising",
  "adText":"Advertise your exchange, brand or payment service here.",
  "sideAdTitle":"Brand Cooperation",
  "sideAdText":"Sponsor this market section.",
  "telegram":"",
  "whatsapp":"",
  "email":"",
  "apiEnabled":true,
  "apiUrl":"/api/rates",
  "registerEnabled":true,
  "showBuySell":true,
  "rates":{
    "usd":{"name":"USD","full":"US Dollar","value":4210,"change":1.2,"trend":"up","spread":25},
    "thb":{"name":"THB","full":"Thai Baht","value":115,"change":-0.3,"trend":"down","spread":2},
    "rmb":{"name":"RMB","full":"Chinese Yuan","value":610,"change":0.4,"trend":"up","spread":6}
  }
}'::jsonb)
on conflict (id) do update set data = excluded.data;
