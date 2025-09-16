import { z } from 'zod';

export const postCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().optional().default(''),
});

export const postUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().optional(),
});

export const ambiguityIssueSchema = z.object({
  description: z.string().min(1),
  location: z.string().optional(),
  severity: z.enum(['low', 'medium', 'high']).optional(),
});

export const toneAssessmentSchema = z.object({
  label: z.string().min(1),
  intensity: z.enum(['positive', 'neutral', 'negative']).optional(),
  confidence: z.number().min(0).max(1).optional(),
  notes: z.string().optional(),
});

export const analysisCreateSchema = z.object({
  postId: z.string().min(1),
  clarityScore: z.number().int().min(0).max(10),
  ambiguityIssues: z.array(ambiguityIssueSchema).default([]),
  toneAssessment: toneAssessmentSchema.default({ label: 'neutral' }),
  suggestions: z.array(z.string().min(1)).default([]),
  strengths: z.array(z.string().min(1)).default([]),
  aiProvider: z.string().min(1),
  modelUsed: z.string().min(1),
});

export const chatMessageCreateSchema = z.object({
  postId: z.string().nullable().optional(),
  role: z.enum(['user', 'assistant', 'system']).default('user'),
  content: z.string().min(1),
  aiProvider: z.string().min(1),
  modelUsed: z.string().min(1),
});

export const providerCreateSchema = z.object({
  name: z.string().min(1),
  baseUrl: z.string().url(),
  apiKey: z.string().min(1),
  defaultModel: z.string().min(1),
  isActive: z.boolean().optional().default(false),
  supportedModels: z.array(z.string().min(1)).default([]),
});

export const providerUpdateSchema = providerCreateSchema.partial();
