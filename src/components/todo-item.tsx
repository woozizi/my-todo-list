'use client';

import React from 'react';
import { Todo } from '@/types/todo';

interface Props {
  todo: Todo;
  onToggle: (t: Todo) => void;
  onDelete: (id: string) => void;
  deleting: boolean;
}

export const TodoItem = ({ todo, onToggle, onDelete, deleting }: Props) => {
  return (
    <li className='flex items-center justify-between rounded border p-2'>
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => onToggle(todo)}
          className='h-5 w-5'
          aria-checked={todo.completed}
          aria-label={
            todo.completed
              ? `미완료로 변경: ${todo.title}`
              : `완료로 변경: ${todo.title}`
          }
        />
        <span className={todo.completed ? 'text-gray-400 line-through' : ''}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        disabled={deleting}
        className='rounded bg-red-500 px-2 py-1 text-sm text-white disabled:opacity-50'
        aria-label={`할 일 삭제: ${todo.title}`}
      >
        {deleting ? '삭제 중…' : '삭제'}
      </button>
    </li>
  );
};
