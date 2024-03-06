import { merge } from 'lodash-es';
import { computed, ref } from 'vue';

export const usePieChart = (props) =>
  computed(() => ({
    dataset: {
      sourceHeader: false,
      dimensions: props.dimensions,
      source: props.data,
    },

    series: {
      type: 'pie',
      label: {
        alignTo: 'edge',
        edgeDistance: '10%',
      },
    },
    tooltip: {
      confine: true,
    },
  }));

export const useCartesianChart = (props) => {
  const seriesCount = computed(() => props.dimensions.length - 1);

  const presetSeries = computed(() =>
    Array(seriesCount.value).fill({
      type: props.type,
    }),
  );

  const defaultOption = computed(() => ({
    dataset: {
      sourceHeader: false,
      dimensions: props.dimensions,
      source: props.data,
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: props.option?.series ?? presetSeries.value,
    tooltip: {
      trigger: 'axis',
      confine: true,
    },
  }));

  return defaultOption;
};

export const useMapChart = (props) =>
  computed(() => ({
    geo: {
      map: props.map,
      roam: false,
      zoom: 1,
      selectedMode: 'single',
      regions: props.data,
    },

    tooltip: {
      confine: true,
    },
  }));

export const useEcharts = (props, type) => {
  const defaultOption =
    type === 'pie'
      ? usePieChart(props)
      : type === 'map'
        ? useMapChart(props)
        : useCartesianChart(props);

  const mergedOption = computed(() =>
    merge({}, defaultOption.value, props.option),
  );
  const chartRef = ref(null);

  return {
    mergedOption,
    chartRef,
  };
};
