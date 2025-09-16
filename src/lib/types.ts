import type {
  AIProviderSettings as PrismaAIProviderSettings,
  AnalysisResult as PrismaAnalysisResult,
  ChatMessage as PrismaChatMessage,
  Post as PrismaPost,
} from '@prisma/client';

type JsonRecord = Record<string, unknown>;

type JsonSerializable = JsonRecord | JsonRecord[] | string[];

export type ChatRole = 'user' | 'assistant' | 'system';

export interface AmbiguityIssue {
  description: string;
  location?: string;
  severity?: 'low' | 'medium' | 'high';
}

export interface ToneAssessment {
  label: string;
  intensity?: 'positive' | 'neutral' | 'negative';
  confidence?: number;
  notes?: string;
}

export interface AnalysisSnapshot {
  id: string;
  postId: string;
  timestamp: Date;
  clarityScore: number;
  ambiguityIssues: AmbiguityIssue[];
  toneAssessment: ToneAssessment;
  suggestions: string[];
  strengths: string[];
  aiProvider: string;
  modelUsed: string;
}

export interface ChatEntry {
  id: string;
  postId?: string | null;
  role: ChatRole;
  content: string;
  timestamp: Date;
  aiProvider: string;
  modelUsed: string;
}

export interface PostComposite extends PrismaPost {
  analysisHistory: PrismaAnalysisResult[];
  chatMessages: PrismaChatMessage[];
}

export type ProviderSetting = PrismaAIProviderSettings;

export const parseJsonField = <T extends JsonSerializable>(value: string, fallback: T): T => {
  try {
    return (value ? (JSON.parse(value) as T) : fallback) ?? fallback;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Failed to parse JSON field', { value, error });
    }
    return fallback;
  }
};

export const stringifyJsonField = (value: JsonSerializable): string => JSON.stringify(value);

export const mapAnalysisResult = (result: PrismaAnalysisResult): AnalysisSnapshot => ({
  id: result.id,
  postId: result.postId,
  timestamp: result.timestamp,
  clarityScore: result.clarityScore,
  ambiguityIssues: parseJsonField<AmbiguityIssue[]>(result.ambiguityIssues, []),
  toneAssessment: parseJsonField<ToneAssessment>(result.toneAssessment, {
    label: 'neutral',
    intensity: 'neutral',
    confidence: 0,
  }),
  suggestions: parseJsonField<string[]>(result.suggestions, []),
  strengths: parseJsonField<string[]>(result.strengths, []),
  aiProvider: result.aiProvider,
  modelUsed: result.modelUsed,
});

export const mapChatMessage = (message: PrismaChatMessage): ChatEntry => ({
  id: message.id,
  postId: message.postId,
  role: (message.role as ChatRole) ?? 'assistant',
  content: message.content,
  timestamp: message.timestamp,
  aiProvider: message.aiProvider,
  modelUsed: message.modelUsed,
});
