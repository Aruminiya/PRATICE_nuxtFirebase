<template>
  <section class="grid grid-cols-9 gap-4 mt-12">
    <!-- 說明區塊 -->
    <section class="col-span-9">
      <h1 class="font-bold">自由測試 Firsebase 的操作</h1>
    </section>
    <!-- 測試區塊 -->
    <section class="col-span-9">
      <UButton @click="testBtn">列出文章</UButton>
    </section>
  </section>
</template>

<script setup>
import { initFirestore, listArticles } from '@/composables/article.js';

// 引用初始化的 firebase 實例
let firestore

const testBtn = async () => {
  const allList = await listArticles(firestore);
  console.log(allList);
}


onMounted(()=>{
  firestore = initFirestore();
})
</script>