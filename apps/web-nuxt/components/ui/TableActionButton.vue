<template>
  <el-button v-bind="buttonProps" :loading="isLoading" :disabled="isLoading">
    <slot v-if="!isLoading"></slot>
  </el-button>
</template>

<script setup>
const props = defineProps({
  buttonProps: {
    type: Object,
    required: true,
  },

  rowProps: {
    type: Object,
    required: true,
  },
});

const buttonProps = computed(() =>
  Object.assign(
    {},
    {
      type: 'text',
      size: 'mini',
    },
    props.buttonProps,
  ),
);

const isLoading = computed(() => props.rowProps.row.loading);
</script>
