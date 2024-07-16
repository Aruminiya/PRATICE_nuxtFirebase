<template>
  <main class="grid grid-cols-9 gap-4 mt-12">
    <!-- 說明區塊 -->
    <section class="col-span-9">
      <h1 class="font-bold">Cloud Firestore - postData 新增資料</h1>
    </section>
    <!-- 操作區塊 -->
    <section class="col-span-9">
      <UButton @click="postData">執行新增資料</UButton>
      <vue-json-pretty :data="result" />
    </section>
  </main>
</template>

<script setup>
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getApp } from 'firebase/app';

const result = ref(null);

// 引用初始化的 firebase 實例
let firestore

// 新增資料
const postData = async () => {
  try {
    // 您可以讓 Cloud Firestore 自動為您產生 ID。呼叫下列語言專屬的 add() 方法即可執行此操作
    const newPost = await addDoc(collection(firestore, "testPosts"), {
      content: "新增測試文章內容23",
      title: "新增測試文章內容23",
      image: "新增測試文章圖片23"
    });
    console.log("新增測試文章成功！");
    result.value = "新增測試文章成功！";
  } catch (error) {
    console.error(error);
  }
}

onMounted(()=>{
  // 引用初始化的 firebase 實例
  const app = getApp();
  console.log(app);

  // 初始化 Storage
  firestore = getFirestore(app, 'testdb');
})
</script>