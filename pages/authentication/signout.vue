<template>
  <main class="grid grid-cols-9 gap-4 mt-12">
    <!-- 說明區塊 -->
    <section class="col-span-9">
      <h1 class="font-bold">Firebase Authentication - signout 登出</h1>
    </section>
    <!-- 操作區塊 -->
    <section class="col-span-9">
      <UButton class="mb-3" @click="signout">執行登出</UButton>
      <br>
      <vue-json-pretty :data="result" />
    </section>
  </main>
</template>

<script setup>
import { getAuth, signOut } from "firebase/auth";
import { getApp } from 'firebase/app';

const result = ref(null);

// 引用初始化的 firebase 實例
let auth

// 登入
const signout = async () => {
  try {
    const userCredential = await signOut(auth);
    result.value = "登出成功";
    console.log(userCredential);
  } catch(error) {
    result.value = "登出失敗";
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