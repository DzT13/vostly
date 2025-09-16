'use client';

import { useMemo } from 'react';

import type { ProviderSetting } from '@/lib/types';

interface AIProviderSettingsProps {
  providers: ProviderSetting[];
  onCreate?: () => void;
}

export function AIProviderSettings({ providers, onCreate }: AIProviderSettingsProps) {
  const activeProvider = useMemo(
    () => providers.find((provider) => provider.isActive),
    [providers],
  );

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Providers</h2>
          <p className="text-sm text-slate-500">Connect multiple OpenAI-compatible backends.</p>
        </div>
        <button
          type="button"
          onClick={onCreate}
          disabled
          className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Add Provider (Coming Soon)
        </button>
      </header>

      {providers.length === 0 ? (
        <p className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
          No providers configured yet. Use the button above after Phase 3 ships to connect OpenAI, Anthropic, or
          local models.
        </p>
      ) : (
        <ul className="space-y-3 text-sm text-slate-700">
          {providers.map((provider) => (
            <li key={provider.id} className="rounded-md border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{provider.name}</p>
                  <p className="text-xs text-slate-500">Base URL: {provider.baseUrl}</p>
                  <p className="text-xs text-slate-500">Default model: {provider.defaultModel}</p>
                </div>
                <span
                  className={	ext-xs font-medium }
                >
                  {provider.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {activeProvider ? (
        <p className="text-xs text-slate-500">
          Active provider: {activeProvider.name} ({activeProvider.baseUrl}) - toggle support arrives in Phase 3.
        </p>
      ) : (
        <p className="text-xs text-slate-500">Select a default provider once one is configured.</p>
      )}
    </div>
  );
}
