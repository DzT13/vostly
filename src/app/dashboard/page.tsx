import Link from 'next/link';

import { PostList } from '@/components/PostList';
import { prisma } from '@/lib/db';

export default async function DashboardPage() {
  const recentPosts = await prisma.post.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 6,
  });

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-600">
          Organize your drafts, run AI analysis, and keep conversations tidy in a private workspace.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-slate-900">Quick Start</h2>
          <p className="mt-2 text-sm text-slate-600">
            Create a new post to begin capturing ideas. You can request AI feedback or open a chat session once
            your content is saved.
          </p>
          <Link
            href="/editor/new"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
          >
            Create New Post
          </Link>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-slate-900">AI Provider Setup</h2>
          <p className="mt-2 text-sm text-slate-600">
            Configure one or more OpenAI-compatible providers. You can switch providers at any time directly
            from the settings page.
          </p>
          <Link
            href="/settings"
            className="mt-4 inline-flex items-center justify-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            View Settings
          </Link>
        </article>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Recent Posts</h2>
          <Link href="/dashboard" className="text-sm font-medium text-slate-500 hover:text-slate-700">
            Refresh
          </Link>
        </div>
        <div className="mt-4">
          <PostList posts={recentPosts} />
        </div>
      </section>
    </section>
  );
}
