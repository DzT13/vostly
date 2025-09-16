import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { prisma } from '@/lib/db';
import { postUpdateSchema } from '@/lib/validators';

interface RouteContext {
  params: { id: string };
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = context.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        analysisHistory: { orderBy: { timestamp: 'desc' } },
        chatMessages: { orderBy: { timestamp: 'asc' } },
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ data: post });
  } catch (error) {
    console.error('Failed to load post', error);
    return NextResponse.json({ error: 'Unable to load post' }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = context.params;

  try {
    const payload = await request.json();
    const data = postUpdateSchema.parse(payload);

    const post = await prisma.post.update({
      where: { id },
      data,
    });

    return NextResponse.json({ data: post });
  } catch (error) {
    console.error('Failed to update post', error);
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Unable to update post' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = context.params;

  try {
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete post', error);
    return NextResponse.json({ error: 'Unable to delete post' }, { status: 500 });
  }
}
