'use client';
import {
  useAddTodo,
  useDeleteTodo,
  useTodos,
  useUpdateTodo,
} from '@/hooks/use-todo';
import { Todo } from '@/types/todo';
import { useState } from 'react';

export default function Home() {
  const { data: todos, isPending, isError } = useTodos();
  const addTodo = useAddTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

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

  if (isPending) return <p>로딩 중입니다</p>;
  if (isError) return <p>데이터 불러오기가 실패했습니다</p>;

  return (
    <div className='mx-auto flex max-w-xl flex-col p-4'>
      <h1 className='mb-4 text-2xl font-bold'>TODO LIST</h1>

      {/*추가 form*/}
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

      {/*할일 리스트*/}
      <ul className='space-y-4'>
        {todos!.map((todo: Todo) => (
          <li
            key={todo.id}
            className='flex items-center justify-between rounded border p-2'
          >
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => toggleCompleted(todo)}
              />
              <span
                className={todo.completed ? 'text-gray-400 line-through' : ''}
              >
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => handleDelete(todo.id)}
              disabled={deleteTodo.isPending}
              className='rounded bg-red-500 px-2 py-1 text-sm text-white'
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
