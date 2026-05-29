export const AI_CONFIG_STORAGE_KEY = "jizhang.ai.config.v1";

export interface AiProviderConfig {
  id?: string;
  name?: string;
  baseUrl: string;
  apiKey: string;
  model: string;
  hasCloudApiKey?: boolean;
  updatedAt?: string;
}

export interface AiEncryptedSecret {
  version: 1;
  algorithm: "AES-256-GCM";
  iv: string;
  ciphertext: string;
  authTag: string;
}

export interface AiCloudConfigRecord {
  id?: string;
  user_id?: string;
  name: string;
  base_url: string;
  model: string;
  encrypted_api_key: AiEncryptedSecret;
  created_at?: string;
  updated_at?: string;
}

export interface AiCloudConfigResponse {
  config: AiProviderConfig | null;
  configs?: AiProviderConfig[];
  updatedAt?: string;
}

export interface AiModelInfo {
  id: string;
  ownedBy?: string;
  created?: number;
}

export type AiChatRole = "user" | "assistant";
export type AiDeepSeekMode = "default" | "inner_os" | "no_inner_os";

export interface AiChatConversation {
  id: string;
  title: string;
  systemPrompt: string;
  deepSeekMode: AiDeepSeekMode;
  providerConfigId?: string | null;
  model: string;
  lastMessageAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AiChatConversationRecord {
  id: string;
  user_id: string;
  title: string;
  system_prompt: string;
  deepseek_mode?: AiDeepSeekMode | null;
  provider_config_id?: string | null;
  model: string;
  last_message_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AiChatMessage {
  id: string;
  role: AiChatRole;
  content: string;
  reasoningContent?: string;
  createdAt: string;
}

export interface AiChatMessageRecord {
  id: string;
  conversation_id: string;
  user_id: string;
  role: AiChatRole;
  content: string;
  reasoning_content?: string | null;
  created_at: string;
  updated_at: string;
}

export type AiChatStreamEvent =
  | {
      type: "content" | "reasoning";
      delta: string;
    }
  | {
      type: "conversation";
      conversation: AiChatConversation;
    };

export interface AiChatConversationListResponse {
  conversations: AiChatConversation[];
}

export interface AiChatConversationResponse {
  conversation: AiChatConversation | null;
  conversations?: AiChatConversation[];
}

export interface AiChatMessagesResponse {
  conversation: AiChatConversation;
  messages: AiChatMessage[];
}

export interface AiApiErrorResponse {
  error: string;
}

export interface AiModelsResponse {
  models: AiModelInfo[];
}

export interface AiChatResponse {
  message: AiChatMessage;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}
