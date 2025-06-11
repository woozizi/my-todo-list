import { addTodo, deleteTodo, fetchTodos, updateTodo } from '@/apis/todo-api';
import { QUERY_KEYS } from '@/constants';
import { Todo } from '@/types/todo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 전체 todo 조회 hook
export const useTodos = () => {
  return useQuery<Todo[]>({
    queryKey: QUERY_KEYS.TODOS,
    queryFn: fetchTodos,
  });
};

// todo 생성 hook
export const useAddTodo = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (title: string) => addTodo(title),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.TODOS });
    },
  });
};

// todo 업데이트 hook
export const useUpdateTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (todo: Todo) => updateTodo(todo),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.TODOS });
    },
  });
};

// todo 삭제 hook
export const useDeleteTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.TODOS });
    },
  });
};
