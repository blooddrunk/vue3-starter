<template>
  <main
    class="3xl:px-10 h-screen overflow-y-auto px-8 py-6 dark:bg-gray-800 dark:text-white"
  >
    <section class="flex flex-col items-center pt-20">
      <header class="flex items-center">
        <NuxtLink to="/">
          <h2 class="text-primary flex items-center py-5 text-3xl font-bold">
            <span>Vue 3</span>
          </h2>
        </NuxtLink>

        <el-button
          class="!ml-3 !text-xl"
          type="primary"
          text
          @click="toggleNightMode"
        >
          <Icon name="mdi:weather-night" v-if="isDark"></Icon>
          <Icon name="mdi:weather-sunny" v-else></Icon>
        </el-button>
      </header>

      <div class="container">
        <slot></slot>
      </div>
    </section>
  </main>
</template>

<script setup>
const isDark = useDark();
const toggleIsDark = useToggle(isDark);
const toggleNightMode = () => toggleIsDark();
</script>
