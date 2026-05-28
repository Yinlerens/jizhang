create table if not exists public.ai_chat_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default '新对话',
  system_prompt text not null default '',
  provider_config_id uuid references public.ai_provider_configs(id) on delete set null,
  model text not null default '',
  last_message_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ai_chat_conversations_title_check check (length(title) between 1 and 80),
  constraint ai_chat_conversations_system_prompt_check check (length(system_prompt) <= 20000)
);

create table if not exists public.ai_chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.ai_chat_conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null,
  content text not null default '',
  reasoning_content text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ai_chat_messages_role_check check (role in ('user', 'assistant')),
  constraint ai_chat_messages_content_or_reasoning_check check (
    length(content) > 0 or coalesce(length(reasoning_content), 0) > 0
  )
);

create index if not exists ai_chat_conversations_user_updated_idx
on public.ai_chat_conversations (user_id, updated_at desc);

create index if not exists ai_chat_conversations_user_last_message_idx
on public.ai_chat_conversations (user_id, last_message_at desc nulls last);

create index if not exists ai_chat_messages_conversation_created_idx
on public.ai_chat_messages (conversation_id, created_at asc, id asc);

create or replace function public.set_ai_chat_conversations_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.set_ai_chat_messages_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke execute on function public.set_ai_chat_conversations_updated_at() from public;
revoke execute on function public.set_ai_chat_messages_updated_at() from public;

drop trigger if exists set_ai_chat_conversations_updated_at on public.ai_chat_conversations;
create trigger set_ai_chat_conversations_updated_at
before update on public.ai_chat_conversations
for each row
execute function public.set_ai_chat_conversations_updated_at();

drop trigger if exists set_ai_chat_messages_updated_at on public.ai_chat_messages;
create trigger set_ai_chat_messages_updated_at
before update on public.ai_chat_messages
for each row
execute function public.set_ai_chat_messages_updated_at();

alter table public.ai_chat_conversations enable row level security;
alter table public.ai_chat_messages enable row level security;

drop policy if exists "Users can read own AI chat conversations" on public.ai_chat_conversations;
create policy "Users can read own AI chat conversations"
on public.ai_chat_conversations
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own AI chat conversations" on public.ai_chat_conversations;
create policy "Users can insert own AI chat conversations"
on public.ai_chat_conversations
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own AI chat conversations" on public.ai_chat_conversations;
create policy "Users can update own AI chat conversations"
on public.ai_chat_conversations
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own AI chat conversations" on public.ai_chat_conversations;
create policy "Users can delete own AI chat conversations"
on public.ai_chat_conversations
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can read own AI chat messages" on public.ai_chat_messages;
create policy "Users can read own AI chat messages"
on public.ai_chat_messages
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own AI chat messages" on public.ai_chat_messages;
create policy "Users can insert own AI chat messages"
on public.ai_chat_messages
for insert
to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.ai_chat_conversations conversation
    where conversation.id = conversation_id
      and conversation.user_id = auth.uid()
  )
);

drop policy if exists "Users can update own AI chat messages" on public.ai_chat_messages;
create policy "Users can update own AI chat messages"
on public.ai_chat_messages
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.ai_chat_conversations conversation
    where conversation.id = conversation_id
      and conversation.user_id = auth.uid()
  )
);

drop policy if exists "Users can delete own AI chat messages" on public.ai_chat_messages;
create policy "Users can delete own AI chat messages"
on public.ai_chat_messages
for delete
to authenticated
using (auth.uid() = user_id);

grant usage on schema public to authenticated;
grant select, insert, update, delete on table public.ai_chat_conversations to authenticated;
grant select, insert, update, delete on table public.ai_chat_messages to authenticated;
