import { useField } from 'vee-validate';
import { computed, ref, toRefs, unref } from 'vue';

export const useFormField = (options) => {
  const {
    name,
    label,
    mode = ref('aggressive'),
    validateOnMount = ref(false),
    bindBlurEvent = ref(false),
    rule,
  } = toRefs(options);

  const { errorMessage, handleChange, ...rest } = useField(name, rule, {
    label,
    validateOnValueUpdate: false,
    validateOnMount: unref(validateOnMount),
  });

  const listeners = computed(() => {
    const validationListeners = {
      onChange: handleChange,
      'onUpdate:modelValue': (e) => handleChange(e, false),
    };

    if (bindBlurEvent.value) {
      validationListeners.onBlur = handleChange;
    }

    const currentMode = unref(mode);
    if (
      currentMode === 'aggressive' ||
      (currentMode === 'aggressiveIfInvalid' && errorMessage.value)
    ) {
      validationListeners['onUpdate:modelValue'] = handleChange;
    }

    return validationListeners;
  });

  return {
    /** original useForm return */
    errorMessage,
    handleChange,
    ...rest,

    listeners,
  };
};
