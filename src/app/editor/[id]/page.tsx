import Link from 'next/link';
import { notFound } from 'next/navigation';

import { prisma } from '@/lib/db';

interface EditorPageProps {
  params: { id: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { id } = params;

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">{post.title}</h1>
          <p className="text-sm text-slate-500">
            Last updated {post.updatedAt.toLocaleString()} - Rich editing and AI guidance will arrive in Phase 2.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Back to Dashboard
        </Link>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-medium text-slate-900">Post Content Preview</h2>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
          {post.content || 'Content editing will be implemented in Phase 2. Use this space to draft and refine your writing.'}
        </p>
      </article>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">AI Analysis</h3>
          <p className="mt-2 text-sm text-slate-600">
            Detailed clarity, ambiguity, and tone insights will appear here after the AI assistant is connected.
          </p>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Chat History</h3>
          <p className="mt-2 text-sm text-slate-600">
            Future conversations with the AI coach for this post will be stored and visible in this panel.
          </p>
        </section>
      </div>
    </section>
  );
}
