import TodoContainer from '@/components/todo-container';

export default function Home() {
  return (
    <div className='mx-auto flex max-w-xl flex-col p-4'>
      <h1 className='mb-4 text-2xl font-bold'>TODO LIST</h1>
      <TodoContainer />
    </div>
  );
}
