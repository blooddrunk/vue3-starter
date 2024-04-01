<template>
  <component :is="tag" class="h-full overflow-y-auto" :style="pageStyle">
    <slot></slot>
  </component>
</template>

<script setup>
const props = defineProps({
  tag: {
    type: String,
    default: 'article',
  },

  footer: {
    type: [String, Number, Boolean],
    default: false,
  },
});

const pageStyle = computed(() => ({
  paddingBottom:
    props.footer === true
      ? '80px'
      : props.footer === false
        ? undefined
        : props.footer,
}));
</script>
