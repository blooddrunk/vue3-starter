<template>
  <div>
    <a
      :class="buttonClass"
      class="shadow-primary inline-flex max-w-40 items-center rounded bg-white px-3 py-1.5 shadow"
      @click.prevent="togglePickerVisible()"
    >
      <span class="truncate">{{ displayValue }}</span>
      <Icon name="mdi:chevron-right" class="ml-2"></Icon>
    </a>

    <van-popup
      v-model:show="isPickerVisible"
      position="bottom"
      close-on-popstate
      :lazy-render="false"
    >
      <van-area
        ref="areaPicker"
        :model-value="value"
        :area-list="areaList"
        :columns-placeholder="['请选择', '请选择', '请选择']"
        @cancel="handleCancel"
        @confirm="handleConfirm"
      ></van-area>
    </van-popup>
  </div>
</template>

<script setup>
import { areaList } from '@vant/area-data';
import { last } from 'lodash-es';

const props = defineProps({
  placeholder: {
    type: String,
    default: '省/市/区',
  },
});

const value = defineModel({
  type: String,
  default: '310000',
});

const isPickerVisible = ref(false);
const togglePickerVisible = useToggle(isPickerVisible);
const selectedAreaList = ref([]);
const isEmpty = computed(() => !selectedAreaList.value.length);
('');
const displayValue = computed(() =>
  isEmpty.value
    ? props.placeholder
    : selectedAreaList.value
        .map((item) => item.text)
        .filter((name) => !!name)
        .join('/'),
);
const buttonClass = computed(() =>
  isEmpty.value ? 'text-medium' : 'text-primary',
);

const areaPicker = ref();

const handleCancel = () => {
  togglePickerVisible(false);
};

const normalizeAreaItems = (items) =>
  items.filter((item) => !!item).filter((item) => item.value !== '000000');
const getValue = (items) => {
  const lastItem = last(items);
  if (lastItem) {
    return lastItem.value === '00000' ? '' : lastItem.value;
  }
  return '';
};
const handleConfirm = ({ selectedOptions }) => {
  selectedAreaList.value = normalizeAreaItems(selectedOptions);
  emit('update:modelValue', getValue(selectedAreaList.value));
  togglePickerVisible(false);
};
</script>
