import Link from 'next/link';

export default function NewEditorPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">Create a New Post</h1>
        <p className="text-sm text-slate-600">
          Start drafting your ideas. Rich text editing, autosave, and AI-assisted suggestions will be available in
          the next development phase.
        </p>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm leading-relaxed text-slate-700">
          The full-featured editor arrives in Phase 2. For now, posts can be seeded from the database or created via
          future UI improvements. This placeholder keeps routing, navigation, and layout consistent.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Back to Dashboard
        </Link>
        <span className="text-xs text-slate-400">
          Coming soon: inline editor, autosave, and AI action menu.
        </span>
      </div>
    </section>
  );
}
