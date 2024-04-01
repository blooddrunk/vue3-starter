<template>
  <div
    :class="[
      $style.input,
      wrapperClass,
      showValidationError && 'relative mb-4',
    ]"
  >
    <div
      :class="{
        [$style.control]: true,
        [$style.controlActive]: isFocused,
      }"
    >
      <label
        v-if="showLabel && hasLabel"
        :class="{ [$style.labelActive]: isLabelActive }"
        :for="name"
        @click="input!.focus()"
        @touchstart.stop="input!.focus()"
      >
        <slot name="label">
          <span>{{ label }}</span>
        </slot>
      </label>

      <input
        :id="name"
        ref="input"
        :value="value"
        :placeholder="placeholder"
        v-bind="$attrs"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @change="handleChange"
      />

      <div v-if="$slots.append" class="ml-auto flex-shrink-0 pl-1">
        <slot name="append"></slot>
      </div>
    </div>

    <p
      v-if="showValidationError && errorMessage"
      class="absolute left-0 top-full"
    >
      <span class="px-2 text-xs font-medium leading-none text-red-500">
        <slot name="error" :error="errorMessage">
          {{ errorMessage }}
        </slot>
      </span>
    </p>
  </div>
</template>

<script setup>
import { useFormField } from '@jn/shared';

defineOptions({
  inheritAttrs: false,
});

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
  },

  placeholder: {
    type: String,
    default: '',
  },

  showValidationError: {
    type: Boolean,
    default: true,
  },

  wrapperClass: {
    type: String,
  },
});

const emit = defineEmits(['focus', 'blur', 'input', 'change']);

// tempalte ref
const input = ref(null);
const slots = useSlots();
const hasLabel = computed(() => !!(slots.label || props.label));

const { listeners, errorMessage, value, meta } = useFormField({
  name: props.name,
  label: props.label,
});

const isFocused = ref(false);
const handleFocus = () => {
  isFocused.value = true;
  emit('focus');
};
const handleBlur = (e) => {
  listeners.value.onBlur(e);
  isFocused.value = false;
  emit('blur');
};
const handleInput = (e) => {
  listeners.value['onUpdate:modelValue'](e);
  emit('input', e.target.value);
};
const handleChange = (e) => {
  listeners.value.onChange(e);
  emit('change', e.target.value);
};

const isLabelActive = computed(
  () => isFocused.value || (meta.dirty && value.value) || props.placeholder,
);
</script>

<style lang="postcss" module>
.input {
  @apply max-w-full pt-5;

  & .control {
    @apply relative mb-1 flex flex-grow items-center;

    &:hover {
      @apply border-primary;
    }

    &::before,
    &::after {
      content: '';
      @apply absolute inset-x-0 bottom-0;
      @apply transition duration-300 ease-out;
    }

    &::before {
      @apply border-b border-inherit;
    }

    &::after {
      @apply border-b-2 border-inherit;
      @apply scale-0 transform;
    }
  }

  & .controlActive {
    &::after {
      @apply scale-100 transform;
    }
  }

  & label {
    @apply absolute left-0;
    @apply ml-2 h-6;
    @apply origin-top-left transition duration-500 ease-in-out;
    @apply text-primary leading-6;
  }

  & .labelActive {
    @apply translate-y-[-1.5rem] scale-75;
  }

  & input {
    @apply flex-grow;
    @apply w-full p-2;
    @apply appearance-none bg-transparent leading-normal;

    &::placeholder {
      @apply text-medium;
    }

    &:focus {
      @apply outline-none;
    }
  }
}
</style>
