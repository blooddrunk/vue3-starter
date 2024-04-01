export const storeKeys = [
  '__ALL__',
  '杭州市',
  '宁波市',
  '温州市',
  '嘉兴市',
  '湖州市',
  '绍兴市',
  '金华市',
  '衢州市',
  '舟山市',
  '台州市',
  '丽水市',
];

export const useDataByCity = () => {
  const runtimeConfig = useRuntimeConfig();
  return useAxios(
    {},
    {
      url: `${runtimeConfig.public.publicPath}datastore.json?_t=${Date.now()}`,
      __transformData: false,
    },
  );
};
