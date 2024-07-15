<template>
  <section class="grid grid-cols-9 gap-4 mt-12">
    <!-- 說明區塊 -->
    <section class="col-span-9">
      <h1 class="font-bold">Example - 新增文章應用測試</h1>
    </section>
    <!-- 操作區塊 -->
    <section class="col-span-9">
      <h2 class="font-bold mb-3">新增文章</h2>
      <div class="w-64">
        <UInput class="mb-3" type="file" size="sm" icon="i-heroicons-folder"
          @change="selectImg" />
        <UInput class="mb-3" color="white" variant="outline"
          placeholder="請輸入標題" v-model="articleData.title" />
        <UTextarea class="mb-3" color="white" variant="outline" width="200" height="1000"
          placeholder="請輸入內文" v-model="articleData.content" />
        <UButton @click="submitArticle">上傳文章</UButton>
      </div>
      <br>
    </section>
    <!-- 結果呈現區塊 -->
    <section class="col-span-9">
      <img class="mb-3" v-if="showArtic.image" :src="showArtic.image" alt="文章圖片">
      <h3 class="font-bold mb-3">{{ showArtic.title }}</h3>
      <p>{{ showArtic.content  }}</p>
    </section>
  </section>
</template>

<script setup>
import { getFirestore, collection, doc, setDoc, getDocs, query } from "firebase/firestore";
import { getStorage, ref as firebaseRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getApp } from 'firebase/app';

// 隨機字串產生
import cryptoRandomString from 'crypto-random-string';

// 引用初始化的 storage 實例
let storage
// 引用初始化的 firebase 實例
let firestore

// 文章資料
const articleData = ref({
  content: "",
  image: "",
  title: ""
});

const showArtic = ref({
  content: "",
  image: null,
  title: ""
});

// 選擇圖片
const selectedFile = ref(null);

const selectImg = (event) => {
  const file = event[0];
  console.log(file);
  selectedFile.value = file;
};

// 新增資料
const submitArticle = async () => {
  if (articleData.value.title !== "" && articleData.value.content !== "" ) {
    try {
      // 如果有圖片 上傳到 storage 並回傳圖片 URL
      if (selectedFile.value) {
        console.log("有圖片");
        const imagesRef = firebaseRef(storage, `images/${selectedFile.value.name}`);
        const snapshot = await uploadBytes(imagesRef, selectedFile.value);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        articleData.value.image = downloadUrl
      }

      // 文章上傳
      const newPost = await setDoc(doc(firestore, "posts", cryptoRandomString({length: 20})), articleData.value);
      console.log("新增測試文章成功！");

      showArtic.value = articleData.value;
      articleData.value = {
        content: "",
        image: "",
        title: ""
      }
    } catch (error) {
      console.error("新增測試文章失敗！");
      console.error(error);
      articleData.value = {
        content: "",
        image: "",
        title: ""
      }
    }
  } else {
    console.error("請輸入標題和內文！");
  }

}

onMounted(()=>{
  // 引用初始化的 firebase 實例
  const app = getApp();
  console.log(app);

  // 初始化 Storage
  storage = getStorage(app);

  // 初始化 Firestore
  firestore = getFirestore(app, 'testdb');
})
</script>