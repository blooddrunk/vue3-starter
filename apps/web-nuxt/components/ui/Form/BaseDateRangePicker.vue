<template>
  <BaseFormItem v-bind="$attrs">
    <template #default="slotProps">
      <el-date-picker
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :editable="false"
        type="daterange"
        :disabled-date="dateLimiter"
        v-bind="slotProps"
      >
        <template v-for="(_, slotName) in $slots" #[slotName]="props">
          <slot :name="slotName" v-bind="props"></slot>
        </template>
      </el-date-picker>
    </template>
  </BaseFormItem>
</template>

<script setup>
import { isAfter } from 'date-fns';

defineOptions({
  inheritAttrs: false,
});

defineProps({
  dateLimiter: {
    type: Function,
    default: (time) => {
      return isAfter(time, new Date());
    },
  },
});
</script>
