'use client';

interface AIAssistantProps {
  disabled?: boolean;
}

export function AIAssistant({ disabled = true }: AIAssistantProps) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <header className="space-y-1">
        <h2 className="text-lg font-medium text-slate-900">AI Writing Coach</h2>
        <p className="text-sm text-slate-500">
          Chat with your configured provider. The interactive chat interface unlocks in Phase 3.
        </p>
      </header>
      <div className="flex-1 rounded-md border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
        {disabled
          ? 'AI chat controls are disabled until provider setup is complete in later phases.'
          : 'The assistant is ready. Start typing to begin a conversation.'}
      </div>
    </div>
  );
}
