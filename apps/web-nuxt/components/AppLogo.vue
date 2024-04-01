<template>
  <component :is="tag" class="flex items-center" :to="route">
    <img :class="classMap.logo" src="@/assets/logo.png" alt="logo" />
    <h1
      :class="classMap.text"
      class="ml-3 font-semibold tracking-wide text-white"
    >
      {{ $appName }}
    </h1>
  </component>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'normal',
    validator: (val) => ['normal', 'large'].includes(val),
  },

  isLink: {
    type: Boolean,
  },
});

const tag = computed(() => (props.isLink ? 'router-link' : 'header'));
const route = computed(() => (props.isLink ? '/' : undefined));
const classMap = computed(() =>
  props.size === 'large'
    ? {
        logo: 'h-12 w-12',
        text: 'text-5xl',
      }
    : {
        logo: 'h-6 w-6',
        text: 'text-2xl',
      },
);
</script>
