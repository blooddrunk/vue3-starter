<template>
  <BaseFormItem v-bind="$attrs" :bind-blur-event="false">
    <template #default="slotProps">
      <el-checkbox v-bind="slotProps">
        <template v-for="(_, slotName) in $slots" #[slotName]>
          <slot :name="slotName"></slot>
        </template>
      </el-checkbox>
    </template>
  </BaseFormItem>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});
</script>
