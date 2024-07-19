import { getApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Timestamp } from "firebase/firestore"

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

// 得到上傳圖片的 snapshot
/**
 * @param {*} selectedFile - 圖片檔案
 */
export const imageGetSnapshot = async (selectedFile) => {
  if (!selectedFile) {
    throw new Error('請先選擇一張圖片');
  }
  if (!selectedFile.type.startsWith("image/")){
    throw new Error('只能上傳圖片檔案');
  }
  // 創建一個儲存指標為 'images/${selectedFile.value.name}'
  // `reference` 是一個指向特定存儲位置的指標
  const imagesRef = ref(initStorage(), `images/${selectedFile.name}_${Timestamp.now().seconds}`);
  // `file` 來自於 Blob 或 File API
  // 這些 API 是現代瀏覽器中用於處理文件和二進制數據的標準接口
  try {
    // 確保文件上傳完成後再返回響應
    const snapshot = await uploadBytes(imagesRef, selectedFile);
    return snapshot
  } catch (error) {
    const errorResponse = {
      message: '圖片上傳失敗。',
      error
    };
    throw new Error(errorResponse);
  }
}

// 得到上傳圖片的 DownloadURL
/**
 * @param {*} selectedFile - 上傳圖片後的快照
 */
export const imageGetDownloadURL = async (uploadImgSnapshot) => {
  // 透過上傳圖片的快照獲取下載 URL
  const downloadUrl = await getDownloadURL(uploadImgSnapshot.ref);
  return downloadUrl
}

// 上傳圖片後得到 URL
/**
 * @param {*} selectedFile - 圖片檔案
 */
export const uploadImg = async (selectedFile) => {
  const snapshot = await imageGetSnapshot(selectedFile);
  const imageURL = await imageGetDownloadURL(snapshot);
  return imageURL
}