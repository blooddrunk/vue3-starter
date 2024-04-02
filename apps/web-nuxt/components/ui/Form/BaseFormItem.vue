<template>
  <el-form-item :class="[{ 'is-required': required }, $attrs.class]" :label="label" :label-width="labelWidth"
    :error="errorMessage" :validate-status="validateStatus">
    <slot v-bind="fieldProps"></slot>
  </el-form-item>
</template>

<script setup>
import { useFormField } from '@jn/shared';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },

  label: {
    type: String,
    default: '',
  },

  showLabel: {
    type: Boolean,
    default: true,
  },

  labelWidth: {
    type: String,
  },

  mode: {
    type: String,
    default: 'aggressiveIfInvalid',
    validator: (val) =>
      ['aggressive', 'lazy', 'aggressiveIfInvalid'].includes(val),
  },

  validateOnMount: {
    type: Boolean,
    default: false,
  },

  bindBlurEvent: {
    type: Boolean,
    default: false,
  },

  required: {
    type: String,
  },

  validateStatus: {
    type: String,
    validator: (val) =>
      !val || ['error', 'validating', 'success'].includes(val),
  },
});

const label = props.showLabel ? props.label : undefined;

const { listeners, errorMessage, value, meta } = useFormField(
  reactivePick(props, 'name', 'label', 'mode', 'validateOnMount', 'rules'),
);

const validateStatus = computed(() => {
  if (errorMessage.value) {
    return 'error';
  } else if (meta.pending) {
    return 'validating';
  } else if (meta.dirty) {
    return 'success';
  } else {
    return '';
  }
});

const attrs = useAttrs();
const fieldProps = computed(() => {
  return {
    ...listeners.value,
    modelValue: value.value,
    ...attrs,
  };
});
</script>
