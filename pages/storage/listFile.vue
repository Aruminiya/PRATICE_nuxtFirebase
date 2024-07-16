<template>
  <main class="grid grid-cols-9 gap-4 mt-12">
    <!-- 說明區塊 -->
    <section class="col-span-9">
      <h1 class="font-bold">Firebase Storage - listFile 可列出檔案</h1>
    </section>
    <!-- 操作區塊 -->
    <section class="col-span-9">
      <UButton @click="listImg">執行列出圖片</UButton>
      <vue-json-pretty :data="result" />
    </section>
  </main>
</template>

<script setup>
import { getStorage, ref as firebaseRef, listAll } from "firebase/storage";
import { getApp } from 'firebase/app';

const result = ref(null);
const selectedFile = ref(null);


// 引用初始化的 firebase 實例
let storage

// 列出圖片
const listImg = async () => {
  // 建立一個要在其下列出的參考
  const listRef = firebaseRef(storage, 'images/');

  try {
    const listResult = await listAll(listRef);
    console.log(listResult);
  } catch(error) {
    console.error(error);
  }
}

onMounted(()=>{
  // 引用初始化的 firebase 實例
  const app = getApp();
  console.log(app);

  // 初始化 Storage
  storage = getStorage(app);
})
</script>