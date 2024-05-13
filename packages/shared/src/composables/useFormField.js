import { toRefs } from '@vueuse/core';
import { useField } from 'vee-validate';

/**
 * A Vue composition function that provides form field validation and event handling.
 *
 * @param {Object} options - An object containing options for the form field.
 * @param {string} options.name - The name of the form field.
 * @param {string} options.label - The label of the form field.
 * @param {Ref<'aggressive'|'aggressiveIfInvalid'|'lazy'>} [options.mode=ref('aggressive')] - The validation mode for the form field.
 * @param {Ref<boolean>} [options.validateOnMount=ref(false)] - Whether to validate the form field on mount.
 * @param {Ref<boolean>} [options.bindBlurEvent=ref(false)] - Whether to bind the blur event for validation.
 * @param {Object|Function} [options.rule] - The validation rule(s) for the form field.
 * @returns {Object} An object containing the form field's error message, a change handler function, and computed validation event listeners.
 * @returns {string} .errorMessage - The error message for the form field.
 * @returns {Function} .handleChange - A function to handle changes to the form field value.
 * @returns {Object} .listeners - A computed object containing event listeners for validation based on the provided options.
 *
 * @remarks
 * The `options` parameter must be a Vue 3 reactive object.
 */
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
