create table if not exists public.ai_provider_configs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'default',
  base_url text not null,
  model text not null default '',
  encrypted_api_key jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ai_provider_configs_name_check check (length(name) between 1 and 64),
  constraint ai_provider_configs_base_url_check check (base_url ~ '^https?://'),
  constraint ai_provider_configs_encrypted_api_key_check check (
    encrypted_api_key ? 'version'
    and encrypted_api_key ? 'algorithm'
    and encrypted_api_key ? 'iv'
    and encrypted_api_key ? 'ciphertext'
    and encrypted_api_key ? 'authTag'
  ),
  unique (user_id, name)
);

create or replace function public.set_ai_provider_configs_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke execute on function public.set_ai_provider_configs_updated_at() from public;

drop trigger if exists set_ai_provider_configs_updated_at on public.ai_provider_configs;

create trigger set_ai_provider_configs_updated_at
before update on public.ai_provider_configs
for each row
execute function public.set_ai_provider_configs_updated_at();

alter table public.ai_provider_configs enable row level security;

drop policy if exists "Users can read own AI provider configs" on public.ai_provider_configs;
create policy "Users can read own AI provider configs"
on public.ai_provider_configs
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own AI provider configs" on public.ai_provider_configs;
create policy "Users can insert own AI provider configs"
on public.ai_provider_configs
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own AI provider configs" on public.ai_provider_configs;
create policy "Users can update own AI provider configs"
on public.ai_provider_configs
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own AI provider configs" on public.ai_provider_configs;
create policy "Users can delete own AI provider configs"
on public.ai_provider_configs
for delete
to authenticated
using (auth.uid() = user_id);

grant usage on schema public to authenticated;
grant select, insert, update, delete on table public.ai_provider_configs to authenticated;
