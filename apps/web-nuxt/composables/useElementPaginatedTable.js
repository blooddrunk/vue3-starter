import { useElementPaginatedTable as _useElementPaginatedTablet } from '@jn/shared';

import { axios } from './useAxios';

export const useElementPaginatedTable = (requestConfig, options) =>
  _useElementPaginatedTablet(requestConfig, {
    ...options,
    axios,
  });
