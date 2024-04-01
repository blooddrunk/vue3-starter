<template>
  <template v-if="loading">
    <OrderItemSkeleton
      v-for="item in placeholderItems"
      :key="item.id"
    ></OrderItemSkeleton>
  </template>
  <template v-else>
    <OrderItem v-for="item in items" :key="item.orderNumber" :item="item">
    </OrderItem>
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
    default: false,
  },

  readonly: {
    type: Boolean,
    default: false,
  },
});

const placeholderItems = [...Array(3).keys()].map((id) => ({
  id: String(id),
}));
</script>
