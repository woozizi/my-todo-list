'use client';
import { useAddTodo, useTodos } from '@/hooks/use-todo';
import { Todo } from '@/types/todo';
import { useState } from 'react';

export default function Home() {
  const { data: todos, isPending, isError } = useTodos();
  const addTodo = useAddTodo();

  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo.mutate(title, {
      onSuccess: () => setTitle(''),
    });
  };

  if (isPending) return <p>로딩 중입니다</p>;
  if (isError) return <p>데이터 불러오기가 실패했습니다</p>;

  return (
    <div className='mx-auto flex max-w-xl flex-col p-4'>
      <h1 className='mb-4 text-2xl font-bold'>TODO LIST</h1>

      <form onSubmit={handleSubmit} className='mb-4 flex gap-2'>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='새 할 일을 입력하세요'
          className='flex-1 rounded border p-2'
        />
        <button
          type='submit'
          disabled={addTodo.isPending}
          className='rounded bg-blue-500 px-4 py-2 text-white'
        >
          {addTodo.isPending ? '추가 중…' : '추가'}
        </button>
      </form>

      <ul className='space-y-4'>
        {todos!.map((todo: Todo) => (
          <li
            key={todo.id}
            className='flex items-center justify-between rounded border p-2'
          >
            <span>ID: {todo.id}</span>
            <span>{todo.title}</span>
            <input type='checkbox' checked={todo.completed} readOnly />
          </li>
        ))}
      </ul>
    </div>
  );
}
