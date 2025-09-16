import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { prisma } from '@/lib/db';
import { stringifyJsonField } from '@/lib/types';
import { providerCreateSchema } from '@/lib/validators';

export async function GET() {
  try {
    const providers = await prisma.aIProviderSettings.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ data: providers });
  } catch (error) {
    console.error('Failed to fetch providers', error);
    return NextResponse.json({ error: 'Unable to fetch providers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = providerCreateSchema.parse(payload);

    if (data.isActive) {
      await prisma.aIProviderSettings.updateMany({ data: { isActive: false } });
    }

    const provider = await prisma.aIProviderSettings.create({
      data: {
        name: data.name,
        baseUrl: data.baseUrl,
        apiKey: data.apiKey,
        defaultModel: data.defaultModel,
        isActive: data.isActive ?? false,
        supportedModels: stringifyJsonField(data.supportedModels ?? []),
      },
    });

    return NextResponse.json({ data: provider }, { status: 201 });
  } catch (error) {
    console.error('Failed to create provider', error);
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return NextResponse.json({ error: 'Provider name must be unique' }, { status: 409 });
    }

    return NextResponse.json({ error: 'Unable to create provider' }, { status: 500 });
  }
}
