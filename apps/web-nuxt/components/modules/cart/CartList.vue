<template>
  <template v-if="loading">
    <CartItemSkeleton
      v-for="item in placeholderItems"
      :key="item.id"
    ></CartItemSkeleton>
  </template>
  <template v-else>
    <CartItem
      v-for="item in items"
      :key="item.id"
      v-model:checked="item.checked"
      v-model:quantity="item.quantity"
      :readonly="readonly"
      :item="item"
    >
    </CartItem>
  </template>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },

  loading: {
    type: Boolean,
    default: 0,
  },

  readonly: {
    type: Boolean,
    default: 0,
  },
});

const placeholderItems = [...Array(5).keys()].map((id) => ({
  id: String(id),
}));
</script>
