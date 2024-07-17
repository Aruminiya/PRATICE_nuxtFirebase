import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { getApp } from 'firebase/app';

// 初始化 Auth
let auth
const initAuth = () => {
  if (!auth) {
    const app = getApp();
    auth = getAuth(app);
    return auth
  } else {
    return auth
  }
}

// 登入
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(initAuth(), email, password);
    return userCredential
  } catch(error) {
    console.error(error);
    let errorMessage;
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = '電子郵件地址格式不正確。';
        break;
      case 'auth/invalid-credential':
        errorMessage = '帳號或密碼不正確。';
        break;
      default:
        errorMessage = '登入過程中發生錯誤。';
    }
    throw new Error(errorMessage);
  }
};

// 登出
export const userSignout = async () => {
  try {
    const userCredential = await signOut(initAuth());
    return userCredential
  } catch(error) {
    console.error(error);
    let errorMessage = '登出過程中發生錯誤。';
    throw new Error(errorMessage);
  }
};

// 查看登入狀態
export const checkLoginUser = () => {
  const user = initAuth().currentUser;
  return user
};

// 註冊
export const singup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(initAuth(), email, password);
    return userCredential
  } catch(error) {
    console.error(error);
    let errorMessage;
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = '該電子郵件地址已經被使用。';
        break;
      case 'auth/invalid-email':
        errorMessage = '電子郵件地址格式不正確。';
        break;
      case 'auth/weak-password':
        errorMessage = '密碼強度不足。';
        break;
      default:
        errorMessage = '註冊過程中發生錯誤。';
    }
    throw new Error(errorMessage);
  }
};