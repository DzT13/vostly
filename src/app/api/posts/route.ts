import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';
import { postCreateSchema } from '@/lib/validators';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json({ data: posts });
  } catch (error) {
    console.error('Failed to load posts', error);
    return NextResponse.json({ error: 'Unable to load posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = postCreateSchema.parse(payload);
    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content ?? '',
      },
    });

    return NextResponse.json({ data: post }, { status: 201 });
  } catch (error) {
    console.error('Failed to create post', error);
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Unable to create post' }, { status: 500 });
  }
}
