import type { ProviderSetting } from '@/lib/types';

export interface AIClientConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
}

export interface AIClient {
  readonly baseUrl: string;
  readonly apiKey: string;
  readonly model: string;
  testConnection(): Promise<boolean>;
  getAvailableModels(): Promise<string[]>;
  analyzeContent(content: string): Promise<unknown>;
  chatCompletion(messages: Array<{ role: string; content: string }>): Promise<unknown>;
}

abstract class BaseAIClient implements AIClient {
  readonly baseUrl: string;
  readonly apiKey: string;
  readonly model: string;

  protected constructor(config: AIClientConfig) {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
    this.model = config.model;
  }

  abstract testConnection(): Promise<boolean>;
  abstract getAvailableModels(): Promise<string[]>;
  abstract analyzeContent(content: string): Promise<unknown>;
  abstract chatCompletion(messages: Array<{ role: string; content: string }>): Promise<unknown>;
}

export class OpenAICompatibleClient extends BaseAIClient {
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(new URL('/models', this.baseUrl), {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      return response.ok;
    } catch (error) {
      console.error('OpenAI connection test failed', error);
      return false;
    }
  }

  async getAvailableModels(): Promise<string[]> {
    try {
      const response = await fetch(new URL('/models', this.baseUrl), {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        return [];
      }
      const payload = (await response.json()) as { data?: Array<{ id: string }> };
      return payload.data?.map((item) => item.id) ?? [];
    } catch (error) {
      console.error('Failed to fetch model list', error);
      return [];
    }
  }

  async analyzeContent(_content: string): Promise<unknown> {
    throw new Error('AI analysis will be implemented in Phase 3.');
  }

  async chatCompletion(_messages: Array<{ role: string; content: string }>): Promise<unknown> {
    throw new Error('AI chat will be implemented in Phase 3.');
  }
}

export class AnthropicClient extends BaseAIClient {
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: 1,
          messages: [
            {
              role: 'user',
              content: 'ping',
            },
          ],
        }),
      });
      return response.ok;
    } catch (error) {
      console.error('Anthropic connection test failed', error);
      return false;
    }
  }

  async getAvailableModels(): Promise<string[]> {
    // Anthropic does not expose a public models endpoint; this will be expanded in Phase 3.
    return [this.model];
  }

  async analyzeContent(_content: string): Promise<unknown> {
    throw new Error('AI analysis will be implemented in Phase 3.');
  }

  async chatCompletion(_messages: Array<{ role: string; content: string }>): Promise<unknown> {
    throw new Error('AI chat will be implemented in Phase 3.');
  }
}

export function createAIClient(provider: ProviderSetting): AIClient {
  const config: AIClientConfig = {
    baseUrl: provider.baseUrl,
    apiKey: provider.apiKey,
    model: provider.defaultModel,
  };

  if (provider.baseUrl.toLowerCase().includes('anthropic')) {
    return new AnthropicClient(config);
  }

  return new OpenAICompatibleClient(config);
}
