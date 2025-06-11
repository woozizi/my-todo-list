import { Filter } from './types/filter';

export const QUERY_KEYS = {
  TODOS: ['todos'] as const,
};
export const API_PATHS = {
  TODOS: '/todos',
};

export const FILTER_LABELS: Record<Filter, string> = {
  all: '전체',
  completed: '완료',
  remaining: '남은',
};

export const FILTER_OPTIONS: Filter[] = ['all', 'completed', 'remaining'];
