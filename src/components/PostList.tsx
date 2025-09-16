import Link from 'next/link';

import type { Post } from '@prisma/client';

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
        No posts found yet. Use the create button to add your first draft.
      </div>
    );
  }

  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {posts.map((post) => (
        <li key={post.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">{post.title}</p>
              <p className="mt-1 text-xs text-slate-500">
                Updated {post.updatedAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </p>
            </div>
            <Link
              href={/editor/}
              className="inline-flex items-center rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Open
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
