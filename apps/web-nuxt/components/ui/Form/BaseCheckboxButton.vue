<template>
  <BaseFormItem v-bind="$attrs" :bind-blur-event="false">
    <template #default="slotProps">
      <el-checkbox-button v-bind="slotProps">
        <template v-for="(_, slotName) in $slots" #[slotName]>
          <slot :name="slotName"></slot>
        </template>
      </el-checkbox-button>
    </template>
  </BaseFormItem>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});
</script>
