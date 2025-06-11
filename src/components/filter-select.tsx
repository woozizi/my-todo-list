'use client';

import React from 'react';

export type Filter = 'all' | 'completed' | 'remaining';

interface Props {
  filter: Filter;
  setFilter: (f: Filter) => void;
  total: number;
  completed: number;
  remaining: number;
}

export const FilterSelect = ({
  filter,
  setFilter,
  total,
  completed,
  remaining,
}: Props) => {
  return (
    <>
      <label htmlFor='filter-select' className='sr-only'>
        필터 선택
      </label>
      <select
        id='filter-select'
        className='mb-4 w-full rounded border p-2'
        value={filter}
        onChange={(e) => setFilter(e.target.value as Filter)}
        aria-label='할 일 필터'
      >
        <option value='all'>전체 ({total})</option>
        <option value='completed'>완료 ({completed})</option>
        <option value='remaining'>남은 ({remaining})</option>
      </select>
    </>
  );
};
