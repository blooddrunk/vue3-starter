<template>
  <el-tabs
    class="mb-4 [&_.el-tabs\_\_content]:hidden"
    :model-value="navTabStore.currentActiveTab"
    :closable="navTabStore.canRemoveNavTab"
    type="border-card"
    @update:model-value="handleChange"
    @tab-remove="handleRemove"
  >
    <el-tab-pane
      v-for="item in navTabStore.currentNavTabList"
      :key="item.route"
      :label="item.title"
      :name="item.route!"
    ></el-tab-pane>
  </el-tabs>
</template>

<script setup>
const navTabStore = useNavTabStore();
const router = useRouter();

const handleChange = (name) => {
  if (name !== navTabStore.currentActiveTab) {
    navTabStore.setActiveTab(name);
    router.push({
      name,
    });
  }
};

const handleRemove = (name) => {
  navTabStore.removeTab(name);
};
</script>
