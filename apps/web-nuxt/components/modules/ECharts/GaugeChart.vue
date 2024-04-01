<template>
  <BorderedCard title="Gauge">
    <div class="2x:gap-3 grid grid-cols-4 gap-1 p-2">
      <GaugeChartItem
        v-for="item in data"
        :key="item.label1"
        :item="item"
      ></GaugeChartItem>
    </div>
  </BorderedCard>
</template>

<script setup>
const chartStore = useChartStore();

const data = computed(() => {
  return chartStore.data?.c1 ?? [];
});
</script>
