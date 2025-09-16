import type { AnalysisSnapshot } from '@/lib/types';

interface AnalysisPanelProps {
  latestAnalysis?: AnalysisSnapshot | null;
}

export function AnalysisPanel({ latestAnalysis }: AnalysisPanelProps) {
  if (!latestAnalysis) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
        Analysis results will appear here once you run the AI clarity check. Configure a provider to enable this
        feature in Phase 3.
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Latest Analysis</h2>
        <p className="text-xs text-slate-500">
          Generated on {latestAnalysis.timestamp.toLocaleString()} by {latestAnalysis.aiProvider} -{' '}
          {latestAnalysis.modelUsed}
        </p>
      </div>
      <dl className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
        <div className="rounded-md border border-slate-200 p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Clarity Score</dt>
          <dd className="text-2xl font-semibold text-slate-900">{latestAnalysis.clarityScore}/10</dd>
        </div>
        <div className="rounded-md border border-slate-200 p-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tone</dt>
          <dd className="text-sm capitalize text-slate-700">{latestAnalysis.toneAssessment.label}</dd>
        </div>
      </dl>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Suggestions</h3>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
          {latestAnalysis.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Strengths</h3>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-emerald-600">
          {latestAnalysis.strengths.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
