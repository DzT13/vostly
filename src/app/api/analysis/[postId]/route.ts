import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';
import { mapAnalysisResult } from '@/lib/types';

interface RouteContext {
  params: { postId: string };
}

export async function GET(_request: Request, context: RouteContext) {
  const { postId } = context.params;

  try {
    const analysis = await prisma.analysisResult.findMany({
      where: { postId },
      orderBy: { timestamp: 'desc' },
    });

    return NextResponse.json({ data: analysis.map(mapAnalysisResult) });
  } catch (error) {
    console.error('Failed to fetch analysis history', error);
    return NextResponse.json({ error: 'Unable to fetch analysis history' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { postId } = context.params;

  try {
    await prisma.analysisResult.deleteMany({ where: { postId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to clear analysis history', error);
    return NextResponse.json({ error: 'Unable to clear analysis history' }, { status: 500 });
  }
}
