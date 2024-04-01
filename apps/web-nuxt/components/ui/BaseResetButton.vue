<template>
  <el-button v-bind="$attrs" type="info" native-type="reset" plain>
    <Icon name="mdi:arrow-u-left-top"></Icon>
    {{ text }}
  </el-button>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});

defineProps({
  text: {
    type: String,
    default: '重置',
  },
});
</script>
