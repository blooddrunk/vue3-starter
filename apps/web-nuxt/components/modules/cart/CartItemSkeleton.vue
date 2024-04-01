<template>
  <div
    class="shadow-light mt-3 grid grid-cols-7 items-center rounded-md bg-white p-2 shadow"
  >
    <div class="col-span-2">
      <div class="bg-light aspect-w-1 aspect-h-1 w-full rounded"></div>
    </div>

    <van-skeleton class="col-span-5" title :row="3" />
  </div>
</template>
