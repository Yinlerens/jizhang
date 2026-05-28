alter table public.ai_provider_configs
drop constraint if exists ai_provider_configs_encrypted_api_key_check;

alter table public.ai_provider_configs
add constraint ai_provider_configs_encrypted_api_key_check check (
  encrypted_api_key ? 'version'
  and encrypted_api_key ? 'algorithm'
  and encrypted_api_key ? 'iv'
  and encrypted_api_key ? 'ciphertext'
  and encrypted_api_key ? 'authTag'
);

