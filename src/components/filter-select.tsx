'use client';

import { FILTER_LABELS, FILTER_OPTIONS } from '@/constants';
import { Filter } from '@/types/filter';
import React from 'react';

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
  const counts = {
    all: total,
    completed,
    remaining,
  };

  return (
    <div className='w-24 sm:w-28'>
      <label htmlFor='filter-select' className='sr-only'>
        필터 선택
      </label>
      <select
        id='filter-select'
        className='block w-full rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500'
        value={filter}
        onChange={(e) => setFilter(e.target.value as Filter)}
        aria-label='할 일 필터'
      >
        {FILTER_OPTIONS.map((type) => (
          <option key={type} value={type}>
            {FILTER_LABELS[type]} ({counts[type]})
          </option>
        ))}
      </select>
    </div>
  );
};
