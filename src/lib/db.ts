﻿import { PrismaClient } from '@prisma/client';

// Maintain a single PrismaClient instance across hot reloads in development.
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export type {
  Post,
  AnalysisResult,
  ChatMessage,
  AIProviderSettings,
} from '@prisma/client';
