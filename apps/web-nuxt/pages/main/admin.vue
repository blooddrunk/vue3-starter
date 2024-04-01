<template>
  <router-view></router-view>
</template>

<script setup>
definePageMeta({
  breadcrumb: true,
});

useFirstNavigableRoute('main-admin');
</script>
