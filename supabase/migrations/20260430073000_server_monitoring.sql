-- Server monitoring dashboard schema

create table if not exists public.monitored_servers (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  provider text,
  region text,
  hostname text,
  ingest_token_hash text not null unique check (ingest_token_hash ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_seen_at timestamptz
);

create table if not exists public.server_metric_samples (
  id bigserial primary key,
  server_id uuid not null references public.monitored_servers(id) on delete cascade,
  sampled_at timestamptz not null default now(),
  cpu_percent numeric(5,2) not null check (cpu_percent >= 0 and cpu_percent <= 100),
  load1 numeric(8,2),
  load5 numeric(8,2),
  load15 numeric(8,2),
  memory_used_percent numeric(5,2) not null check (memory_used_percent >= 0 and memory_used_percent <= 100),
  memory_total_bytes bigint check (memory_total_bytes is null or memory_total_bytes >= 0),
  memory_used_bytes bigint check (memory_used_bytes is null or memory_used_bytes >= 0),
  disk_used_percent numeric(5,2) check (disk_used_percent is null or (disk_used_percent >= 0 and disk_used_percent <= 100)),
  disk_total_bytes bigint check (disk_total_bytes is null or disk_total_bytes >= 0),
  disk_used_bytes bigint check (disk_used_bytes is null or disk_used_bytes >= 0),
  net_rx_bps bigint check (net_rx_bps is null or net_rx_bps >= 0),
  net_tx_bps bigint check (net_tx_bps is null or net_tx_bps >= 0),
  uptime_seconds bigint check (uptime_seconds is null or uptime_seconds >= 0),
  created_at timestamptz not null default now()
);

create index if not exists monitored_servers_owner_idx
  on public.monitored_servers (owner_id, created_at desc);

create index if not exists server_metric_samples_server_time_idx
  on public.server_metric_samples (server_id, sampled_at desc);

alter table public.monitored_servers enable row level security;
alter table public.server_metric_samples enable row level security;

revoke all on public.monitored_servers from anon, authenticated;
revoke all on public.server_metric_samples from anon, authenticated;
revoke all on sequence public.server_metric_samples_id_seq from anon, authenticated;

grant select, insert, update, delete on public.monitored_servers to authenticated;
grant select on public.server_metric_samples to authenticated;

create policy "Users can view their monitored servers"
  on public.monitored_servers
  for select
  to authenticated
  using ((select auth.uid()) = owner_id);

create policy "Users can register monitored servers"
  on public.monitored_servers
  for insert
  to authenticated
  with check ((select auth.uid()) = owner_id);

create policy "Users can update their monitored servers"
  on public.monitored_servers
  for update
  to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

create policy "Users can delete their monitored servers"
  on public.monitored_servers
  for delete
  to authenticated
  using ((select auth.uid()) = owner_id);

create policy "Users can view samples for their servers"
  on public.server_metric_samples
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.monitored_servers servers
      where servers.id = server_metric_samples.server_id
        and servers.owner_id = (select auth.uid())
    )
  );
