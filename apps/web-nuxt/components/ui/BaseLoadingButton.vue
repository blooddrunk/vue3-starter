<template>
  <el-button
    class="!px-1.5"
    :loading="isLoading"
    :disabled="isLoading"
    :type="type"
    :link="link"
    :size="size"
    v-bind="$attrs"
    @click="handleButtonClick"
  >
    <slot v-if="isLoading && hasLoadingSlot" name="loading"> </slot>
    <slot v-else></slot>
  </el-button>
</template>

<script setup>
import { ElMessageBox } from 'element-plus';

defineOptions({
  inheritAttrs: false,
});

const slots = useSlots();
const hasLoadingSlot = computed(() => !!slots.loading);

const props = defineProps({
  confirmText: {
    type: String,
    default: '',
  },

  size: {
    type: String,
    default: 'default',
  },

  type: {
    type: String,
    default: 'primary',
  },

  link: {
    type: Boolean,
    default: true,
  },
});

const { isLoading, execute } = useAsyncState(props.action, null, {
  immediate: false,
});
const handleButtonClick = async () => {
  if (props.confirmText) {
    try {
      await ElMessageBox.confirm(props.confirmText, '提示', {
        type: 'warning',
      });

      execute();
    } catch (error) {
      // cancel
    }
  } else {
    execute();
  }
};
</script>
