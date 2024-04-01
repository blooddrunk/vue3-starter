<template>
  <el-sub-menu v-if="hasChildren" :index="item.id">
    <template #title>
      <Icon
        v-if="item.icon"
        :icon="getIcon(item.icon)"
        width="1.2em"
        height="1.2em"
      ></Icon>
      <span class="ml-1.5">{{ item.title }}</span>
    </template>

    <TheSidebarItem
      v-for="child in filter(item.children)"
      :key="child.id"
      :item="child"
      :filter="filter"
    ></TheSidebarItem>
  </el-sub-menu>

  <el-menu-item v-else :index="item.id" @click="handleItemClick(item)">
    <Icon
      v-if="item.icon"
      :icon="getIcon(item.icon)"
      width="1.2em"
      height="1.2em"
    ></Icon>
    <span class="ml-1.5">{{ item.title }}</span>
  </el-menu-item>
</template>

<script setup>
import { icons } from '@iconify-json/mdi';
import { getIconData } from '@iconify/utils';
import { Icon } from '@iconify/vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },

  filter: {
    type: Function,
    required: true,
  },
});

const hasChildren = computed(() => !!props.item.children?.length);

const router = useRouter();
const handleItemClick = (item) => {
  if (item.route) {
    router.push({
      name: item.route,
    });
  } else {
    console.warn(`No route config found for '${item.id}'`);
  }
};

const getIcon = (shortname) => getIconData(icons, shortname) || '';
</script>
