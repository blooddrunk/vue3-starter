<template>
  <el-menu
    class="!border-b-0"
    :default-active="currentSystem"
    mode="horizontal"
    :ellipsis="false"
    background-color="transparent"
    text-color="white"
    active-text-color="var(--color-secondary)"
    @select="handleSystemSwitch"
  >
    <el-menu-item
      v-for="system in systemList"
      :key="system.value"
      :index="system.value"
    >
      {{ system.label }}
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { promiseTimeout } from '@jn/shared';
import { storeToRefs } from 'pinia';

import { getRouteOfMenuItem } from '@/utils/menu';

const menuStore = useMenuStore();
const authStore = useAuthStore();
const { systemList, currentSystem } = storeToRefs(menuStore);
const router = useRouter();

const handleSystemSwitch = async (key) => {
  menuStore.currentMenuList = [];

  await promiseTimeout(300);
  menuStore.switchSystem(key);

  const nextRoute = getRouteOfMenuItem(authStore.firstPermittedMenuBySystem);
  if (nextRoute) {
    router.push(nextRoute);
  }
};
</script>
