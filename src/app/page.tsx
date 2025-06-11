import { fetchTodos } from '@/apis/todo-api';
import TodoContainer from '@/components/todo-container';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function Home() {
  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ['todos'],
    queryFn: () => fetchTodos(),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <div className='mx-auto flex min-h-screen w-full max-w-xl flex-col bg-white px-2 py-6 shadow sm:rounded-lg sm:px-4 md:px-8'>
        <h1 className='mb-4 text-2xl font-bold'>TODO LIST</h1>
        <TodoContainer />
      </div>
    </HydrationBoundary>
  );
}
