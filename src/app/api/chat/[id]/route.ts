import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

interface RouteContext {
  params: { id: string };
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = context.params;

  try {
    await prisma.chatMessage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete chat message', error);
    return NextResponse.json({ error: 'Unable to delete chat message' }, { status: 500 });
  }
}
