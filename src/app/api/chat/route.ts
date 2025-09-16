import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { prisma } from '@/lib/db';
import { mapChatMessage } from '@/lib/types';
import { chatMessageCreateSchema } from '@/lib/validators';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const postId = url.searchParams.get('postId') ?? undefined;

  try {
    const messages = await prisma.chatMessage.findMany({
      where: postId ? { postId } : undefined,
      orderBy: { timestamp: 'asc' },
      take: 100,
    });

    return NextResponse.json({ data: messages.map(mapChatMessage) });
  } catch (error) {
    console.error('Failed to fetch chat messages', error);
    return NextResponse.json({ error: 'Unable to fetch chat messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = chatMessageCreateSchema.parse(payload);

    const message = await prisma.chatMessage.create({
      data: {
        postId: data.postId ?? undefined,
        role: data.role,
        content: data.content,
        aiProvider: data.aiProvider,
        modelUsed: data.modelUsed,
      },
    });

    return NextResponse.json({ data: mapChatMessage(message) }, { status: 201 });
  } catch (error) {
    console.error('Failed to create chat message', error);
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Unable to create chat message' }, { status: 500 });
  }
}
