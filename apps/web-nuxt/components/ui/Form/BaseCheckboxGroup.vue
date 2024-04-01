<template>
  <BaseFormItem v-bind="$attrs" :bind-blur-event="false">
    <template #default="slotProps">
      <el-checkbox-group v-bind="slotProps">
        <el-checkbox-button
          v-for="item in props.items"
          :key="item.value"
          v-bind="item"
        ></el-checkbox-button>
      </el-checkbox-group>
    </template>
  </BaseFormItem>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>
