'use client';
import { useTodos } from '@/hooks/use-todo';
import { Todo } from '@/types/todo';

export default function Home() {
  const { data: todos, isPending, isError } = useTodos();

  if (isPending) return <p>로딩 중입니다</p>;
  if (isError) return <p>데이터 불러오기가 실패했습니다</p>;

  return (
    <div className='mx-auto flex max-w-xl flex-col p-4'>
      <h1 className='mb-4 text-2xl font-bold'>할 일 목록</h1>
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
