<template>
  <aside :class="$style.sidebar">
    <div class="border-b border-gray-100">
      <el-button
        class="!h-[var(--el-menu-item-height)] w-full"
        link
        type="primary"
        @click="handleSidebarCollapse"
      >
        <Icon v-if="uiStore.isSidebarCollapsed" name="mdi:menu"></Icon>
        <Icon v-else name="mdi:menu-open"></Icon>
      </el-button>
    </div>

    <el-menu
      :default-active="defaultActiveName"
      :collapse="uiStore.isSidebarCollapsed"
    >
      <TheSidebarItem
        v-for="menu in filterPermittedMenu(menuStore.currentMenuList)"
        :key="menu.id"
        :item="menu"
        :filter="filterPermittedMenu"
      ></TheSidebarItem>
    </el-menu>
  </aside>
</template>

<script setup>
const uiStore = useUIStore();
const menuStore = useMenuStore();

const handleSidebarCollapse = () => uiStore.toggleIsSidebarCollapsed();

const route = useRoute();
const defaultActiveName = computed(() => {
  const matched = menuStore.menuLookupByRoute[route.name];
  return matched ? matched.id : '';
});

const authStore = useAuthStore();
const filterPermittedMenu = (items) =>
  items
    ? items.filter(
        (item) =>
          !!authStore.permittedMenuLookupById[item.id] &&
          item.isVisible !== false,
      )
    : [];
</script>

<style lang="postcss" module>
.sidebar {
  @apply h-[var(--app-content-height)] flex-shrink-0;
  @apply overflow-y-auto border-r border-gray-200;

  :global {
    .el-menu {
      @apply min-h-80;
      @apply border-none !important;

      &:not(.el-menu--collapse) {
        @apply w-56;
      }
    }
  }
}
</style>
