<template>
  <main class="container mx-auto h-full">
    <div class="grid grid-cols-12 gap-4 h-full">
      <section class="col-span-12 sm:col-span-3 shadow-xl">
        <div class="mt-12 ">
          <div class="px-3" v-for="{ name, childLinks } in links" :key="links.name">
            <p class="font-bold">{{ name }}</p>
            <div v-for="{ link, name, descript } in childLinks" :key="link.name">
              <NuxtLink :to="link">
                <UTooltip class="w-full" :text="descript" :popper="{ placement: 'right' }">
                  <UButton variant="outline" class="linkBtn transition-colors my-1 py-2 bg-phototaxisBlue-50 hover:bg-phototaxisBlue-100
                    text-phototaxisBlue-500 w-full rounded-lg">
                    <p class="text-center w-full">{{ name }}</p>
                  </UButton>
                </UTooltip>
              </NuxtLink>
            </div>
            <br>
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
    name: "test",
    childLinks: [
      {
      link: '/test',
      name: '自由測試區',
      descript: '自由測試區',
      }
    ] 
  },
  { 
    name: "authentication",
    childLinks: [
      {
      link: '/authentication/login',
      name: 'login',
      descript: '登入功能',
      },
      {
      link: '/authentication/signout',
      name: 'signout',
      descript: '登出功能',
      },
      {
      link: '/authentication/signup',
      name: 'signup',
      descript: '註冊功能',
      }
    ] 
  },
  { 
    name: "storage",
    childLinks: [
      {
      link: '/storage/uploadFile',
      name: 'uploadFile',
      descript: '可讓您上傳及分享使用者原創內容 (例如圖片和影片)',
      },
      {
        link: '/storage/listFile',
        name: 'listFile',
        descript: '可讓您列出 Cloud Storage 值區的內容',
      }
    ] 
  },
  { 
    name: "firestore",
    childLinks: [
      {
        link: '/firestore/getData',
        name: 'getData',
        descript: '取得儲存在 Cloud Firestore 中的資料',
      },
      {
        link: '/firestore/postData',
        name: 'postData',
        descript: '新增資料在 Cloud Firestore 中',
      },
      {
        link: '/firestore/updateData',
        name: 'updateData',
        descript: '更新儲存在 Cloud Firestore 中的資料',
      }
    ] 
  },
  { 
    name: "Example 應用測試",
    childLinks: [
      {
        link: '/example/postArticle',
        name: '新增文章應用測試',
        descript: 'Post Article 新增文章應用測試',
      }
    ] 
  }
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