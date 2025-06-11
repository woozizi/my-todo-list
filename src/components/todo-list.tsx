'use client';

import React from 'react';
import { Todo } from '@/types/todo';
import { TodoItem } from './todo-item';

interface Props {
  todos: Todo[];
  onToggle: (t: Todo) => void;
  onDelete: (id: string) => void;
  deletePending: boolean;
}

export const TodoList = ({
  todos,
  onToggle,
  onDelete,
  deletePending,
}: Props) => (
  <ul className='space-y-4'>
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={onToggle}
        onDelete={onDelete}
        deletePending={deletePending}
      />
    ))}
  </ul>
);
