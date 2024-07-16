<template>
  <section class="grid grid-cols-9 gap-4 mt-12">
    <!-- 說明區塊 -->
    <section class="col-span-9">
      <h1 class="font-bold">自由測試 Firsebase 的操作</h1>
    </section>
    <!-- 測試區塊 -->
    <section class="col-span-9">
      <h3 class="font-bold mb-3">列出文章</h3>
      <UButton @click="listArticlesBtn">列出文章</UButton>
      <hr class="my-3"/>
      <h3 class="font-bold mb-3">上傳文章</h3>
      <UButton @click="uploadArticlesBtn">上傳文章</UButton>
    </section>
  </section>
</template>

<script setup>
import { initFirestore, listArticles, uploadArticles } from '@/composables/article.js';

// 引用初始化的 firebase 實例
let firestore

// 列出文章
const listArticlesBtn = async () => {
  const allList = await listArticles(firestore);
  console.log(allList);
}

// 上傳文章
const postData = { title: "標題 ABC", content: "內文 ABC", image: "" }
const uploadArticlesBtn = async () => {
  const toPostData = uploadArticles(firestore, postData);
  console.log(toPostData);
}

onMounted(()=>{
  firestore = initFirestore();
})
</script>