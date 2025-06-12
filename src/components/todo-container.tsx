'use client';
import { FilterSelect } from '@/components/filter-select';
import { TodoForm } from '@/components/todo-form';
import { TodoList } from '@/components/todo-list';
import {
  useAddTodo,
  useDeleteTodo,
  useTodos,
  useUpdateTodo,
} from '@/hooks/use-todo';
import { Filter } from '@/types/filter';
import { Todo } from '@/types/todo';
import { useState } from 'react';

import React from 'react';

const TodoContainer = () => {
  const { data: todos = [], isPending, isError } = useTodos();
  const addTodo = useAddTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  if (isPending) return <p>로딩 중입니다</p>;
  if (isError) return <p>데이터 불러오기가 실패했습니다</p>;

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const remaining = total - completed;
  const filtered = todos.filter((t) =>
    filter === 'completed'
      ? t.completed
      : filter === 'remaining'
        ? !t.completed
        : true
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('할 일을 입력해주세요!');
      return;
    }

    addTodo.mutate(title, {
      onSuccess: () => setTitle(''),
    });
  };

  const toggleCompleted = (todo: Todo) => {
    updateTodo.mutate({ ...todo, completed: !todo.completed });
  };

  const handleDelete = (id: string) => {
    deleteTodo.mutate(id);
  };

  return (
    <div>
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='mb-4 text-2xl font-bold'>TODO LIST</h1>
        <FilterSelect
          filter={filter}
          setFilter={setFilter}
          total={total}
          completed={completed}
          remaining={remaining}
        />
      </div>
      <TodoForm
        title={title}
        setTitle={setTitle}
        onSubmit={handleSubmit}
        isPending={addTodo.isPending}
      />
      <TodoList
        todos={filtered}
        onToggle={toggleCompleted}
        onDelete={handleDelete}
        deletePending={deleteTodo.isPending}
      />
    </div>
  );
};

export default TodoContainer;
