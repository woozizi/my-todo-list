import { api } from '@/lib/api';
import { Todo } from '@/types/todo';

/**
 * todo 리스트를 가져오는 함수
 * @returns {Promise<Todo>} Todo 객체 배열을 반환
 */
export const fetchTodos = async (): Promise<Todo[]> => {
  const { data } = await api.get('/todos');
  return data;
};

/**
 * 새로운 todo를 추가하는 함수
 * @param title - 새로운 todo의 제목
 * @returns {Promise<Todo>} 생성된 Todo 객체를 반환
 */
export const addTodo = async (title: string): Promise<Todo> => {
  const { data } = await api.post('/todos', { title, completed: false });
  return data;
};

/**
 * 기존의 todo를 업데이트하는 함수
 * @param todo - 업데이트할 todo 객체
 * @returns {Promise<Todo>} 업데이트 Todo 객체를 반환
 */
export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const { data } = await api.put(`/todos/${todo.id}`, todo);
  return data;
};

/**
 * todo를 삭제하는 함수
 * @param id - 삭제할 todo의 고유 식별자
 */
export const deleteTodo = async (id: string): Promise<void> => {
  await api.delete(`/todos/${id}`);
};
