'use client';

import { useState } from 'react';

interface PostEditorProps {
  initialTitle?: string;
  initialContent?: string;
  disabled?: boolean;
  onChange?: (payload: { title: string; content: string }) => void;
}

export function PostEditor({
  initialTitle = '',
  initialContent = '',
  disabled = true,
  onChange,
}: PostEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    onChange?.({ title: value, content });
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    onChange?.({ title, content: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="post-title">
          Title
        </label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(event) => handleTitleChange(event.target.value)}
          disabled={disabled}
          placeholder="Coming soon: live title editing"
          className="rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:bg-slate-100"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="post-content">
          Content
        </label>
        <textarea
          id="post-content"
          value={content}
          onChange={(event) => handleContentChange(event.target.value)}
          disabled={disabled}
          placeholder="Rich text editing will be implemented in Phase 2."
          className="h-64 resize-y rounded-md border border-slate-200 px-3 py-2 text-sm leading-relaxed shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:bg-slate-100"
        />
      </div>
    </div>
  );
}
