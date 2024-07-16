<template>
  <main class="grid grid-cols-9 gap-4 mt-12">
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
      <hr class="my-3"/>
      <h3 class="font-bold mb-3">取得單一文章</h3>
      <UButton @click="getArticleBtn">取得單一文章</UButton>
      <hr class="my-3"/>
      <h3 class="font-bold mb-3">上傳圖片</h3>
      <UInput class="w-64 my-3" type="file" size="sm" icon="i-heroicons-folder" @change="selectImg" />
      <UButton @click="uploadImgBtn">上傳圖片</UButton>
    </section>
  </main>
</template>

<script setup>
import { initFirestore, listArticles, uploadArticles, getArticle } from '@/composables/article.js';
import { initStorage, uploadImg } from '@/composables/image.js'

// 引用初始化的 firestore 實例
let firestore

// 引用初始化的 storage 實例
let storage

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

// 取得單一文章
const getArticleBtn = async () => {
  const getData = await getArticle(firestore, "5b8cd485ccf49f9d3080");
  console.log(getData);
}

// 上傳圖片
// 選擇圖片
const selectedFile = ref(null);
const selectImg = (event) => {
  const file = event[0];
  console.log(file);
  selectedFile.value = file;
}

const uploadImgBtn = async () => {
  const imgUpload = uploadImg(storage, selectedFile.value);
  console.log(imgUpload);
}

onMounted(()=>{
  firestore = initFirestore();
  storage = initStorage();
})
</script>