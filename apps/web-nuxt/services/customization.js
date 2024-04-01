import { useAxios } from '@/composables/useAxios';

export const useCustomizationDetail = () => {
  const { execute, ...rest } = useAxios({});
  return {
    ...rest,
    execute: () =>
      execute({
        url: `https://jsonplaceholder.typicode.com/posts`,
        __transformData: (data) => ({
          ...data,
          detailImage: 'http://via.placeholder.com/640x1080',
          bannerImageList: [
            {
              url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm',
              isVideo: true,
            },
          ].concat(
            [...Array(10).keys()].map(() => ({
              url: `http://via.placeholder.com/640`,
              isVideo: false,
            })),
          ),
        }),
      }),
  };
};

export const makeAppointment = () => {
  const { data, isLoading, execute } = useAxios(
    {},
    {
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'post',
    },
  );
  return {
    data,
    isLoading,
    execute: (item) =>
      execute({
        data: item,
      }),
  };
};
