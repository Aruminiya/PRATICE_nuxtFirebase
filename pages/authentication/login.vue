<template>
  <main class="grid grid-cols-9 gap-4 mt-12">
    <!-- 說明區塊 -->
    <section class="col-span-9">
      <h1 class="font-bold">Firebase Authentication - login 登入</h1>
    </section>
    <!-- 操作區塊 -->
    <section class="col-span-9">
      <UButton class="mb-3" @click="login">執行登入</UButton>
      <br>
      <UButton @click="checkLoginUser">查看當前登入者</UButton>
      <vue-json-pretty :data="result" />
    </section>
  </main>
</template>

<script setup>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getApp } from 'firebase/app';

const result = ref(null);

// 引用初始化的 firebase 實例
let auth

// 登入
const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, "user002@gmail.com", "user002");
    result.value = "登入成功";
    console.log(userCredential);
  } catch(error) {
    result.value = "登入失敗";
    console.error(error);
  }
}

// 查看當前登入者
const checkLoginUser = () => {
  const user = auth.currentUser;
  console.log(user);
}


onMounted(()=>{
  // 引用初始化的 firebase 實例
  const app = getApp();
  console.log(app);

  // 初始化 Auth
  auth = getAuth(app);
})
</script>