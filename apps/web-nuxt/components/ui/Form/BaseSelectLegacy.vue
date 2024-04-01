<template>
  <BaseFormItem v-bind="$attrs">
    <template #default="slotProps">
      <el-select v-bind="slotProps">
        <el-option
          v-for="item in items"
          :key="item.value"
          v-bind="item"
        ></el-option>
      </el-select>
    </template>
  </BaseFormItem>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});

defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>
