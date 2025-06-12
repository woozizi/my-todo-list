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

  return useMutation<Todo, Error, Todo, { previous?: Todo[] }>({
    mutationFn: (updated) => updateTodo(updated),

    onMutate: async (updated) => {
      await qc.cancelQueries({ queryKey: QUERY_KEYS.TODOS });

      const previous = qc.getQueryData<Todo[]>(QUERY_KEYS.TODOS);

      qc.setQueryData<Todo[]>(QUERY_KEYS.TODOS, (old = []) =>
        old.map((todo) =>
          todo.id === updated.id ? { ...todo, ...updated } : todo
        )
      );

      return { previous };
    },

    onError: (error, _variables, context: any) => {
      if (context?.previous) {
        qc.setQueryData(QUERY_KEYS.TODOS, context.previous);
      }
      alert(`할 일 수정 실패 : ${error.message}`);
    },

    onSettled: () => {
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
