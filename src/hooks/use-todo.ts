import { addTodo, fetchTodos } from '@/apis/todo-api';
import { Todo } from '@/types/todo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 전체 todo 조회 hook
export const useTodos = () => {
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
};

// todo 생성 hook
export const useAddTodo = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (title: string) => addTodo(title),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
