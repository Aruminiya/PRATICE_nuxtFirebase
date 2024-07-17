import { getApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// 初始化 Storage
let storage
const initStorage = () => {
  if (!storage) {
    const app = getApp();
    storage = getStorage(app);
    return storage
  } else {
    return storage
  }
}

// 上傳圖片
/**
 * 123
 * @param {*} storage 
 * @param {*} selectedFile 
 * @returns 
 */
export const uploadImg = async (selectedFile) => {
  if (!selectedFile) {
    throw new Error('請先選擇一張圖片');
  }

  // 創建一個儲存指標為 'images/${selectedFile.value.name}'
  // `reference` 是一個指向特定存儲位置的指標
  const imagesRef = ref(initStorage(), `images/${selectedFile.name}`);
  // `file` 來自於 Blob 或 File API
  // 這些 API 是現代瀏覽器中用於處理文件和二進制數據的標準接口
  try {
    const snapshot = await uploadBytes(imagesRef, selectedFile);
    // 確保文件上傳後再獲取下載 URL
    const downloadUrl = await getDownloadURL(snapshot.ref);
    // 確保文件上傳完成後再返回響應
    const response = {
      message: '成功上傳圖片',
      snapshot: snapshot,
      imgUrl: downloadUrl
    };
    return response
  } catch (error) {
    const response = {
      message: '上傳失敗',
      error: error.message,
    };
    throw new Error(response);
  }
}