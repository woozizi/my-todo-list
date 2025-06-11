'use client';

import React from 'react';

interface Props {
  title: string;
  setTitle: (s: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
}

export const TodoForm = ({ title, setTitle, onSubmit, isPending }: Props) => (
  <form onSubmit={onSubmit} className='mb-6 flex gap-2'>
    <input
      type='text'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder='새 할 일을 입력하세요'
      className='flex-1 rounded border p-2'
    />
    <button
      type='submit'
      disabled={isPending}
      className='rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50'
    >
      {isPending ? '추가 중…' : '추가'}
    </button>
  </form>
);
