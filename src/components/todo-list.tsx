'use client';

import React from 'react';
import { Todo } from '@/types/todo';
import { TodoItem } from './todo-item';

interface Props {
  todos: Todo[];
  onToggle: (t: Todo) => void;
  onDelete: (id: string) => void;
  deletingId: string | null;
}

export const TodoList = ({ todos, onToggle, onDelete, deletingId }: Props) => {
  return (
    <ul className='space-y-4' aria-label='할 일 목록' role='list'>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          deleting={deletingId === todo.id}
        />
      ))}
    </ul>
  );
};
