export const useSimpleFormList = () => {
  const runtimeConfig = useRuntimeConfig();
  return useAxios([], {
    url: `${runtimeConfig.public.jsonServerPath}users`,
    __transformData: false,
  });
};

export const useAddProduct = () => {
  const runtimeConfig = useRuntimeConfig();
  const { execute } = useAxios(
    null,
    {
      url: `${runtimeConfig.public.jsonServerPath}users`,
      method: 'post',
    },
    {
      immediate: false,
    },
  );

  return {
    addProduct: (product) =>
      execute({
        data: product,
      }),
  };
};

export const useRemoveProduct = () => {
  const runtimeConfig = useRuntimeConfig();
  const { execute } = useAxios(
    null,
    {
      url: `${runtimeConfig.public.jsonServerPath}users`,
      method: 'delete',
    },
    {
      immediate: false,
    },
  );

  return {
    removeProduct: (product) =>
      execute({
        data: product,
      }),
  };
};
