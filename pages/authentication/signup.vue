<template>
  <main class="grid grid-cols-9 gap-4 mt-12">
    <!-- 說明區塊 -->
    <section class="col-span-9">
      <h1 class="font-bold">Firebase Authentication - signup 註冊</h1>
    </section>
    <!-- 操作區塊 -->
    <section class="col-span-9">
      <UButton @click="signup">執行註冊</UButton>
      <vue-json-pretty :data="result" />
    </section>
  </main>
</template>

<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getApp } from 'firebase/app';

const result = ref(null);

// 引用初始化的 firebase 實例
let auth

// 註冊
const signup = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, "user002@gmail.com", "user002");
    result.value = "註冊成功";
    console.log(userCredential);
  } catch(error) {
    result.value = "註冊失敗";
    console.error(error);
  }
}

onMounted(()=>{
  // 引用初始化的 firebase 實例
  const app = getApp();
  console.log(app);

  // 初始化 Auth
  auth = getAuth(app);
})
</script>