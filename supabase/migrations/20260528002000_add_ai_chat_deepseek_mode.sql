alter table public.ai_chat_conversations
add column if not exists deepseek_mode text not null default 'default';

alter table public.ai_chat_conversations
drop constraint if exists ai_chat_conversations_deepseek_mode_check;

alter table public.ai_chat_conversations
add constraint ai_chat_conversations_deepseek_mode_check check (
  deepseek_mode in ('default', 'inner_os', 'no_inner_os')
);
