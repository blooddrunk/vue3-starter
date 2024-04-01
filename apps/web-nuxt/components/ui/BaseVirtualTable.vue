<template>
  <el-table-v2 ref="tableRef" v-bind="$attrs">
    <template v-for="(_, slotName) in slots" #[slotName]>
      <slot :name="slotName"></slot>
    </template>

    <template v-if="loading" #overlay>
      <div
        class="absolute inset-0 z-50 grid place-content-center bg-white/80 transition dark:bg-slate-800/95"
      >
        <Icon class="animate-spin" name="mdi:loading"></Icon>
      </div>
    </template>
  </el-table-v2>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});

const { overlay, ...slots } = useSlots();

const tableRef = ref();
defineExpose({
  tableRef,
});

defineProps({
  loading: {
    type: Boolean,
  },
});
</script>
