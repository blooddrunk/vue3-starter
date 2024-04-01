<template>
  <ECharts
    ref="chartRef"
    :autoresize="autoResize"
    :theme="currentTheme"
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
    default: false,
  },

  theme: {
    type: String,
    default: 'primary',
  },
});

const { chartRef, mergedOption } = useEcharts(props, props.type);

/**
 * ! this will not work reactively
 */
const isDark = useDark();
const currentTheme = computed(() => (isDark.value ? 'dark' : props.theme));
</script>
