import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { prisma } from '@/lib/db';
import { stringifyJsonField } from '@/lib/types';
import { providerUpdateSchema } from '@/lib/validators';

interface RouteContext {
  params: { id: string };
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = context.params;

  try {
    const provider = await prisma.aIProviderSettings.findUnique({ where: { id } });

    if (!provider) {
      return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
    }

    return NextResponse.json({ data: provider });
  } catch (error) {
    console.error('Failed to fetch provider', error);
    return NextResponse.json({ error: 'Unable to fetch provider' }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = context.params;

  try {
    const payload = await request.json();
    const data = providerUpdateSchema.parse(payload);

    if (data.isActive) {
      await prisma.aIProviderSettings.updateMany({
        data: { isActive: false },
        where: { NOT: { id } },
      });
    }

    const provider = await prisma.aIProviderSettings.update({
      where: { id },
      data: {
        ...data,
        supportedModels:
          data.supportedModels !== undefined
            ? stringifyJsonField(data.supportedModels)
            : undefined,
      },
    });

    return NextResponse.json({ data: provider });
  } catch (error) {
    console.error('Failed to update provider', error);
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Unable to update provider' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = context.params;

  try {
    await prisma.aIProviderSettings.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete provider', error);
    return NextResponse.json({ error: 'Unable to delete provider' }, { status: 500 });
  }
}
