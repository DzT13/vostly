import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { prisma } from '@/lib/db';
import { mapAnalysisResult, stringifyJsonField } from '@/lib/types';
import { analysisCreateSchema } from '@/lib/validators';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const postId = url.searchParams.get('postId') ?? undefined;

  try {
    const analysis = await prisma.analysisResult.findMany({
      where: postId ? { postId } : undefined,
      orderBy: { timestamp: 'desc' },
      take: 20,
    });

    return NextResponse.json({ data: analysis.map(mapAnalysisResult) });
  } catch (error) {
    console.error('Failed to load analysis results', error);
    return NextResponse.json({ error: 'Unable to load analysis results' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = analysisCreateSchema.parse(payload);

    const created = await prisma.analysisResult.create({
      data: {
        postId: data.postId,
        clarityScore: data.clarityScore,
        ambiguityIssues: stringifyJsonField(data.ambiguityIssues),
        toneAssessment: stringifyJsonField(data.toneAssessment),
        suggestions: stringifyJsonField(data.suggestions),
        strengths: stringifyJsonField(data.strengths),
        aiProvider: data.aiProvider,
        modelUsed: data.modelUsed,
      },
    });

    return NextResponse.json({ data: mapAnalysisResult(created) }, { status: 201 });
  } catch (error) {
    console.error('Failed to create analysis result', error);
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Unable to create analysis result' }, { status: 500 });
  }
}
