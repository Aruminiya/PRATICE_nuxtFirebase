<template>
  <main class="grid grid-cols-9 gap-4 mt-12">
    <!-- 說明區塊 -->
    <section class="col-span-9">
      <h1 class="font-bold">Cloud Firestore - getData 取得資料</h1>
    </section>
    <!-- 操作區塊 -->
    <section class="col-span-9">
      <UButton @click="getData">執行取的資料</UButton>
      <vue-json-pretty :data="result" />
    </section>
  </main>
</template>

<script setup>
import { getFirestore, collection, getDocs, query } from "firebase/firestore";
import { getApp } from 'firebase/app';

const result = ref(null);

// 引用初始化的 firebase 實例
let firestore

// 取得資料
const getData = async () => {
  try {
    const q = query(collection(firestore, "testPosts"));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    const data = querySnapshot.docs.map(doc => {
      
      return { 
        id: doc.id,
        ...doc.data()
      }
    });
    console.log(data);
    result.value = data;
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