import { initializeApp } from 'firebase/app';

// 定義變量來存儲 Firebase 應用和 Storage 實例
let firebaseApp = false;

// 函數：初始化並返回 Firebase 應用實例
export default defineNuxtPlugin(() => {
  const {public:{firebase:config}} = useRuntimeConfig()
  // 如果 firebaseApp 尚未初始化，則進行初始化
  if (!firebaseApp) {
    // 從環境變數中獲取 Firebase 配置
    const firebaseConfig = {
      ...config
    };

    // 初始化 Firebase 應用
    firebaseApp = initializeApp(firebaseConfig);
    console.log('Plugin: firebase init !', firebaseApp);
  }

  // 返回 Firebase 應用實例
  return firebaseApp;
})