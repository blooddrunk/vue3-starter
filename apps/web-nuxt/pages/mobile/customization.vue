<template>
  <article class="relative h-full bg-white pb-[56px]">
    <ProductDetailBanner :items="data.bannerImageList"> </ProductDetailBanner>

    <van-image
      v-if="data.detailImage"
      class="min-h-56 w-full"
      fit="cover"
      :src="data.detailImage"
    >
    </van-image>

    <PageFooter class="!bottom-[50px] justify-center">
      <NuxtLink v-slot="{ navigate }" custom to="/mobile/appointment">
        <van-button class="w-11/12" type="primary" round @click="navigate">
          立即预约
        </van-button>
      </NuxtLink>
    </PageFooter>
  </article>
</template>

<script setup>
definePageMeta({
  layout: 'tabbar-navbar',
  title: '全屋智能',
});

const { data, execute } = useCustomizationDetail();

execute();
</script>
