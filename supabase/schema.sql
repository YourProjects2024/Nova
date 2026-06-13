create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_id text not null unique,
  payment_id text not null,
  status text not null default 'paid'
    check (status in ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled')),
  customer jsonb not null,
  items jsonb not null,
  subtotal numeric(10, 2) not null,
  shipping_fee numeric(10, 2) not null default 0,
  total numeric(10, 2) not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;

drop policy if exists "Allow public order creation" on public.orders;
create policy "Allow public order creation"
on public.orders
for insert
to anon
with check (true);

drop policy if exists "Allow admins to read orders" on public.orders;
create policy "Allow admins to read orders"
on public.orders
for select
to authenticated
using (true);

drop policy if exists "Allow admins to update orders" on public.orders;
create policy "Allow admins to update orders"
on public.orders
for update
to authenticated
using (true)
with check (true);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);
