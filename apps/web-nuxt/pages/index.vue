<template>
  <ul class="m-auto w-2/3 list-none text-lg md:w-1/2">
    <li v-for="item in menuList" :key="item.text" class="border-b px-2 py-3">
      <NuxtLink
        class="flex cursor-pointer items-center justify-between"
        :to="item.to"
      >
        {{ item.text }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
definePageMeta({
  requiresAuth: false,
});

const menuList = ref([
  {
    text: 'Simple list',
    to: '/simple-list',
  },

  {
    text: 'Virtual list',
    to: '/virtual-list',
  },

  {
    text: 'Simple Form',
    to: '/simple-form',
  },

  {
    text: 'ECharts',
    to: '/echarts',
  },

  {
    text: 'Biz Admin',
    to: '/main/admin',
  },

  {
    text: 'Mobile layout with vant',
    to: '/mobile',
  },
]);
</script>
