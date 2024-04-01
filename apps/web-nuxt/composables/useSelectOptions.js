import { isObject } from 'lodash-es';
import { computed, unref } from 'vue';

const isSelectOption = (op) => {
  if (isObject(op) && 'value' in op && 'label' in op) {
    return true;
  }
  return false;
};

export const useSelectOptions = (items, showAllOptions = '全部') => [
  computed(() => {
    const _showAllOptions = unref(showAllOptions);
    if (_showAllOptions) {
      let option = {
        label: '全部',
        value: '',
      };

      if (isSelectOption(_showAllOptions)) {
        option = {
          ...option,
          ..._showAllOptions,
        };
      } else if (typeof _showAllOptions === 'string') {
        option.label = _showAllOptions;
      }

      return [option].concat(unref(items));
    } else {
      return unref(items);
    }
  }),
  items,
];
