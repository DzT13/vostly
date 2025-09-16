import Link from 'next/link';

import { prisma } from '@/lib/db';

export default async function SettingsPage() {
  const providers = await prisma.aIProviderSettings.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">AI Provider Settings</h1>
        <p className="text-sm text-slate-600">
          Manage OpenAI-compatible providers, configure API keys, and test connectivity. CRUD operations arrive in
          Phase 3; this page establishes layout and data plumbing now.
        </p>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-medium text-slate-900">Configured Providers</h2>
        {providers.length === 0 ? (
          <p className="mt-3 text-sm text-slate-600">
            No providers stored yet. Add a provider once the configuration form ships in Phase 3.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {providers.map((provider) => (
              <li key={provider.id} className="rounded-md border border-slate-200 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{provider.name}</p>
                    <p className="text-xs text-slate-500">Base URL: {provider.baseUrl}</p>
                  </div>
                  <span className={	ext-xs font-medium }>
                    {provider.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Default model: {provider.defaultModel} - Supported models stored as JSON.
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
        The interactive settings form, provider testing workflow, and credential storage hardening will be completed
        in Phase 3. This scaffold ensures routing, database access, and UI hierarchy are production-ready now.
      </div>

      <Link
        href="/dashboard"
        className="inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
      >
        Back to Dashboard
      </Link>
    </section>
  );
}
