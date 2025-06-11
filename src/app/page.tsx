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
      <div className='mx-auto flex max-w-xl flex-col p-4'>
        <h1 className='mb-4 text-2xl font-bold'>TODO LIST</h1>
        <TodoContainer />
      </div>
    </HydrationBoundary>
  );
}
