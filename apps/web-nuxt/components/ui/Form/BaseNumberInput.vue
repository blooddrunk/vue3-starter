<template>
  <BaseFormItem v-bind="$attrs">
    <template #default="{ modelValue, ...props }">
      <el-input-number :model-value="toNumber(modelValue)" v-bind="props">
        <template v-for="(index, slotName) in $slots" #[slotName]>
          <slot :name="slotName"></slot>
        </template>
      </el-input-number>
    </template>
  </BaseFormItem>
</template>

<script setup>
import { toNumber } from '@jn/shared';

defineOptions({
  inheritAttrs: false,
});
</script>
