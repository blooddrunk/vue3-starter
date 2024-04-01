<template>
  <div class="flex items-center text-xs leading-tight">
    <div
      class="3xl:w-8 3xl:h-3 h-3 w-6 rounded-sm"
      :style="indicatorStyle"
    ></div>
    <div>
      <div class="ml-1.5">{{ label }}</div>
      <div class="text-primary ml-1.5">
        {{ toCompactDisplayString(value ?? 0) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { toCompactDisplayString } from '@jn/shared';

const props = defineProps({
  color: String,
  label: String,
  value: Number,
});

const indicatorStyle = computed(() => ({
  backgroundColor: props.color,
}));
</script>
