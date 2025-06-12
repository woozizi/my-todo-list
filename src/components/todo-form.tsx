'use client';

import React from 'react';

interface Props {
  title: string;
  setTitle: (s: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
}

export const TodoForm = ({ title, setTitle, onSubmit, isPending }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className='mb-6 flex w-full flex-col gap-2 sm:flex-row'
    >
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        placeholder='새 할 일을 입력하세요'
        className='flex-1 rounded border px-2 py-1 text-sm sm:text-base'
        aria-label='새 할 일 입력'
      />
      <button
        type='submit'
        disabled={isPending}
        className='rounded bg-blue-500 px-2 py-1 text-sm text-white disabled:opacity-50 sm:text-base'
        aria-label='할 일 추가'
      >
        {isPending ? '추가 중…' : '추가'}
      </button>
    </form>
  );
};
