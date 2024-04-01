import { random } from 'lodash-es';

import { useAxios } from '@/composables/useAxios';
import { usePaginatedList } from '@/composables/usePaginatedList';

export const useProductList = () => {
  return usePaginatedList(
    {
      url: 'https://jsonplaceholder.typicode.com/posts',
      __transformData: (data, { headers }) => {
        return {
          items: (data || []).map((item) => ({
            ...item,
            price: random(2000),
            thumbnail: 'http://via.placeholder.com/640x240',
          })),
          total: Number(headers['x-total-count']) || 0,
        };
      },
    },
    {
      transformPaginationToQuery: (pagination) => ({
        _page: pagination.currentPage.value,
        _limit: pagination.pageSize.value,
      }),
      infinite: true,
      pageSize: 5,
    },
  );
};

export const useProductDetail = () => {
  const { execute, ...rest } = useAxios({});
  return {
    ...rest,
    execute: (id) =>
      execute({
        url: `https://jsonplaceholder.typicode.com/posts/${id}`,
        __transformData: (data) => ({
          ...data,
          price: random(2000),
          detailImage: 'http://via.placeholder.com/640x1080',
          bannerImageList: [
            {
              url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm',
              isVideo: true,
            },
          ].concat(
            Array.from({ length: 10 }, () => ({
              url: `http://via.placeholder.com/640`,
              isVideo: false,
            })),
          ),
        }),
      }),
  };
};
