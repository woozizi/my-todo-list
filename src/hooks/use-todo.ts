import { addTodo, deleteTodo, fetchTodos, updateTodo } from '@/apis/todo-api';
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

export const useUpdateTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (todo: Todo) => updateTodo(todo),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

// todo 삭제 hook
export const useDeleteTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
