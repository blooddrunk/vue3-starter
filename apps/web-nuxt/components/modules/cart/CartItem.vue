<template>
  <van-swipe-cell :disabled="readonly">
    <div class="mt-3 rounded-md bg-white p-2">
      <div class="flex items-center">
        <van-checkbox
          v-if="!readonly"
          v-model="_checked"
          class="flex-shrink-0 pr-1.5"
          icon-size="18px"
        ></van-checkbox>

        <div class="grid flex-grow grid-cols-7 items-center gap-3">
          <van-image
            class="aspect-w-1 aspect-h-1 col-span-2 w-full"
            :src="item.thumbnail"
            fit="cover"
            round
            radius="8px"
          ></van-image>

          <div class="col-span-5 self-start">
            <div class="text-medium line-clamp-3 break-all leading-none">
              <figcaption class="text-dark inline">
                {{ item.title }}
              </figcaption>
              <span class="text-light ml-2 text-xs">
                {{ item.body }}
              </span>
            </div>
            <div class="mt-2 flex items-center">
              <span class="text-primary font-bold">{{ item.price }}</span>
              <span class="text-primary ml-1 text-xs">元/月</span>

              <span v-if="readonly" class="ml-auto text-sm font-semibold">
                x{{ quantity }}
              </span>
              <van-stepper
                v-else
                v-model="_quantity"
                class="ml-auto"
                integer
                min="1"
                max="99"
                :disabled="cart.isItemPatching"
              ></van-stepper>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #right>
      <van-button
        square
        text="删除"
        type="danger"
        class="!h-full"
        :loading="cart.isItemRemoving"
        @click="handleRemove"
      ></van-button>
    </template>
  </van-swipe-cell>
</template>

<script setup>
import { debouncedWatch, useVModel } from '@vueuse/core';
import { showConfirmDialog, showFailToast } from 'vant';

const props = defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:checked', 'update:quantity']);

const _checked = useVModel(props, 'checked', emit);
const _quantity = useVModel(props, 'quantity', emit);

const cart = useCartStore();

watch(
  () => cart.itemPatchingError || cart.itemRemovingError,
  (value) => {
    if (value) {
      showFailToast(value.message);
    }
  },
);

debouncedWatch(
  _quantity,
  () => {
    cart.patchItem(props.item);
  },
  {
    debounce: 500,
  },
);
const handleRemove = async () => {
  try {
    await showConfirmDialog({
      title: '提示',
      message: '是否确认删除？',
    });

    await cart.removeItem(props.item);
    if (!cart.itemRemovingError) {
      cart.items = cart.items.filter((item) => item.id !== props.item.id);
    }
  } catch (error) {
    // * user cancel, do nothing
  }
};
</script>
