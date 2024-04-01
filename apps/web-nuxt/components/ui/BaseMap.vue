<template>
  <ECharts
    ref="chartRef"
    :autoresize="autoResize"
    :theme="theme"
    :option="mergedOption"
    v-bind="$attrs"
  ></ECharts>
</template>

<script setup>
import { useEcharts } from '@jn/shared';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  autoResize: {
    type: Boolean,
    default: true,
  },

  loading: {
    type: Boolean,
  },

  theme: {
    type: String,
    default: 'primary',
  },
});

const { chartRef, mergedOption } = useEcharts(props, 'map');

defineExpose({
  chartRef,
});
</script>
