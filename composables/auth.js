import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getApp } from 'firebase/app';

// 初始化 Storage
export const initAuth = () => {
  // 引用初始化的 firebase 實例
  const app = getApp();
  return getAuth(app);
}

// 登入
export const login = async (auth, email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential
  } catch(error) {
    throw error
  }
};

// 查看登入狀態
export const checkLoginUser = (auth) => {
  const user = auth.currentUser;
  return user
};

// 註冊
export const singup = async (auth, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential
  } catch(error) {
    throw error
  }
};