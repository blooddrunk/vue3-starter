import { computed, ref } from 'vue';

import { usePagination } from './usePagination';

export const useArrayPagination = (array, paginationOptions = {}) => {
  const arrayRef = ref(array);

  const pagination = usePagination({
    ...paginationOptions,
    total: computed(() => (arrayRef.value ? arrayRef.value.length : 0)),
  });

  const result = computed(() => {
    const array = arrayRef.value;

    if (!Array.isArray(array)) {
      return [];
    }

    return array.slice(
      pagination.offset.value,
      pagination.offset.value + pagination.pageSize.value,
    );
  });

  return {
    ...pagination,
    result,
  };
};
