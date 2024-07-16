<template>
  <main class="grid grid-cols-9 gap-4 mt-12">
    <!-- 說明區塊 -->
    <section class="col-span-9">
      <h1 class="font-bold">Cloud Firestore - updateData 更新資料</h1>
    </section>
    <!-- 操作區塊 -->
    <section class="col-span-9">
      <UButton @click="updateData">執行更新資料</UButton>
      <vue-json-pretty :data="result" />
    </section>
  </main>
</template>

<script setup>
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getApp } from 'firebase/app';

const result = ref(null);

// 引用初始化的 firebase 實例
let firestore

// 更新資料
const updateData = async () => {
  try {
    const newPost = await updateDoc(doc(firestore, "testPosts", "2c72dfa7792a6c3874dc"), {
      content: "更新測試文章內容03",
      title: "更新測試文章內容03",
      image: "更新測試文章圖片03"
    });
    console.log("更新測試文章成功！");
    result.value = "更新測試文章成功！";
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