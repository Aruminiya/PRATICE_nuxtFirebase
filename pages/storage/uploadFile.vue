<template>
  <main class="grid grid-cols-9 gap-4 mt-12">
    <!-- 說明區塊 -->
    <section class="col-span-9">
      <h1 class="font-bold">Firebase Storage - uploadFile 上傳檔案</h1>
    </section>
    <!-- 操作區塊 -->
    <section class="col-span-9">
      <div class="w-64">
        <UInput type="file" size="sm" icon="i-heroicons-folder" @change="selectImg" />
      </div>
      <br>
      <UButton @click="upLoadImg">上傳圖片</UButton>
      <vue-json-pretty :data="result" />
    </section>
  </main>
</template>

<script setup>
import { getStorage, ref as firebaseRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getApp } from 'firebase/app';

const result = ref(null);
const selectedFile = ref(null);


// 選擇圖片
const selectImg = (event) => {
  const file = event[0];
  console.log(file);
  selectedFile.value = file;

  result.value = file;
}


// 引用初始化的 firebase 實例
let storage

const upLoadImg = async () => {
  if (!selectedFile.value) {
    console.error('請先選擇一張圖片');

    result.value = '請先選擇一張圖片'
    return;
  }

  // 創建一個儲存指標為 'images/${selectedFile.value.name}'
  // `reference` 是一個指向特定存儲位置的指標
  const imagesRef = firebaseRef(storage, `images/${selectedFile.value.name}`);
  console.log(imagesRef);

  // `file` 來自於 Blob 或 File API
  // 這些 API 是現代瀏覽器中用於處理文件和二進制數據的標準接口
  try {
    const snapshot = await uploadBytes(imagesRef, selectedFile.value);
    console.log('Uploaded a blob or file!', snapshot);

    // 確保文件上傳後再獲取下載 URL
    const downloadUrl = await getDownloadURL(snapshot.ref);

    // 確保文件上傳完成後再返回響應
    const response = {
      message: '成功串接 API',
      snapshot: snapshot,
      imgUrl: downloadUrl
    };
    console.log(response);

    result.value = response;

    return response
  } catch (error) {
    console.error('Upload failed', error);
    const response = {
      message: '上傳失敗',
      error: error.message,
    };
    console.log(response);
    
    result.value = response;

    return response
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