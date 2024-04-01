import { usePaginatedList as _usePaginatedList } from '@jn/shared';

import { axios } from './useAxios';

export const usePaginatedList = (requestConfig, options) =>
  _usePaginatedList(requestConfig, {
    ...options,
    axios,
  });
