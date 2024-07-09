<template>
  <main class="container mx-auto h-full">
    <div class="grid grid-cols-12 gap-4 h-full">
      <section class="col-span-12 sm:col-span-3 shadow-xl">
        <div class="mt-12 ">
          <div class="px-3" v-for="{ link, name, descript } in links" :key="link.name">
            <NuxtLink :to="link">
              <UTooltip class="w-full" :text="descript" :popper="{ placement: 'right' }">
                <UButton variant="outline" class="linkBtn transition-colors my-1 py-2 bg-phototaxisBlue-50 hover:bg-phototaxisBlue-100
                  text-phototaxisBlue-500 w-full rounded-lg">
                  <p class="text-center w-full">{{ name }}</p>
                </UButton>
              </UTooltip>
            </NuxtLink>
          </div>
        </div>
      </section>
      <section class="col-span-12 sm:col-span-9">
        <slot />
      </section>
    </div>
  </main>
</template>

<script setup>
const methodColor = (color)=>{
  if ( color === 'GET' ) {
    return 'green'
  } else if ( color === 'POST' ) {
    return 'blue'
  } else if ( color === 'PATCH' ) {
    return 'orange'
  } else if ( color === 'PUT' ) {
    return 'yellow'
  } else if ( color === 'DELETE' ) {
    return 'red'
  } else {
    return 'gray'
  }
}

const links = ref([
  {
    link: '/storage',
    name: 'Storage',
    descript: '可讓您上傳及分享使用者原創內容 (例如圖片和影片)',
  },
]);

</script>

<style scoped lang="scss">
.router-link-exact-active {
  .linkBtn {
    background-color: $phototaxisBlue-50;
    color: $phototaxisBlue-500;
  }
}
</style>