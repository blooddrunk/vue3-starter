<template>
  <el-button v-bind="$attrs" type="primary" native-type="submit">
    <Icon name="mdi:magnify"></Icon>
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
    default: '查询',
  },
});
</script>
