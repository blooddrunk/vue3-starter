import { useStorage } from '@vueuse/core';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useChartStore = defineStore('chart', () => {
  const { data: store, execute: fetchData } = useDataByCity();

  const currentCity = useStorage('city', '杭州市');
  const onCityChange = (newCity) => {
    currentCity.value = newCity;
  };

  return {
    data: computed(() => ({
      ...store.value.__ALL__,
      ...store.value[currentCity.value],
    })),
    fetchData,

    currentCity,
    onCityChange,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChartStore, import.meta.hot));
}
