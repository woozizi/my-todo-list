'use client';

import React from 'react';
import { Todo } from '@/types/todo';

interface Props {
  todo: Todo;
  onToggle: (t: Todo) => void;
  onDelete: (id: string) => void;
  deletePending: boolean;
}

export const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  deletePending,
}: Props) => (
  <li className='flex items-center justify-between rounded border p-2'>
    <div className='flex items-center gap-2'>
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={() => onToggle(todo)}
        className='h-5 w-5'
      />
      <span className={todo.completed ? 'text-gray-400 line-through' : ''}>
        {todo.title}
      </span>
    </div>
    <button
      onClick={() => onDelete(todo.id)}
      disabled={deletePending}
      className='rounded bg-red-500 px-2 py-1 text-sm text-white disabled:opacity-50'
    >
      삭제
    </button>
  </li>
);
