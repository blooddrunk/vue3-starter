import { cloneDeep, merge } from 'lodash-es';
import { computed, readonly, ref, shallowRef, unref, watch } from 'vue';

import { trimValues } from '../utils';
import { useAxios } from './useAxios';
import { usePagination } from './usePagination';

export const usePaginatedList = (requestConfig, options = {}) => {
  const {
    filter = {},
    initialItems = [],
    transformPaginationToQuery = (pagination) => ({
      currentPage: pagination.currentPage.value,
      pageSize: pagination.pageSize.value,
    }),
    infinite = false,
    axios,
    onSuccess,
    onError,
  } = options;

  const __filter = ref(filter);
  const lastAppliedFilter = ref({});

  const pagination = usePagination(options);

  const getRequestConfig = (config) => {
    const payloadValues = {
      ...trimValues(unref(lastAppliedFilter)),
      ...transformPaginationToQuery(pagination),
    };

    const mergedConfig = merge({}, requestConfig, config);
    const method = (mergedConfig?.method ?? 'get').toLowerCase();
    const payload =
      method === 'get' ? { params: payloadValues } : { data: payloadValues };

    return {
      ...mergedConfig,
      ...payload,
    };
  };

  const { data, isLoading, error, errorMessage, execute } = axios
    ? useAxios(
        {
          items: [],
          total: 0,
        },
        getRequestConfig(),
        axios,
        {
          immediate: false,
          onSuccess,
          onError,
        },
      )
    : useAxios(
        {
          items: [],
          total: 0,
        },
        getRequestConfig(),
        {
          immediate: false,
          onSuccess,
          onError,
        },
      );

  const items = shallowRef(initialItems);

  watch(data, (value) => {
    if (!value || !value.items || !Array.isArray(value.items)) {
      throw new Error(
        `[fetchList] expects response data to be an object with 'items' and 'total'(optional) as keys, do you forget to define a proper data transformer?`,
      );
    }

    if (infinite && !pagination.isFirstPage.value) {
      items.value = items.value.concat(value.items);
    } else {
      items.value = value.items;
    }

    pagination.total.value = value.total || 0;
  });

  const fetchList = (config) => {
    lastAppliedFilter.value = cloneDeep(unref(__filter));
    return execute(getRequestConfig(config));
  };

  const fetchListAndReset = (config) => {
    if (pagination.isFirstPage.value) {
      return fetchList(config);
    } else {
      pagination.currentPage.value = 1;
    }
  };

  watch(pagination.currentPage, () => {
    fetchList();
  });
  watch(pagination.pageSize, () => {
    fetchList();
  });

  return {
    items,
    isLoading,
    error,
    errorMessage,
    isEmpty: computed(() => !items.value.length),

    pagination,

    fetchList,
    fetchListAndReset,

    filter: __filter,
    lastAppliedFilter: readonly(lastAppliedFilter),
  };
};
