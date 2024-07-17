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
    const errorResponse = {
      message: '',
      error
    };
    switch (error.code) {
      case 'auth/invalid-email':
        errorResponse.message = '電子郵件地址格式不正確。';
        break;
      case 'auth/invalid-credential':
        errorResponse.message = '帳號或密碼不正確。';
        break;
      default:
        errorResponse.message = '登入過程中發生錯誤。';
    }
    throw new Error(errorResponse);
  }
};

// 登出
export const userSignout = async () => {
  try {
    const userCredential = await signOut(initAuth());
    return userCredential
  } catch(error) {
    const errorResponse = {
      message: '登出過程中發生錯誤。',
      error
    };
    throw new Error(errorResponse);
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
    const errorResponse = {
      message: '',
      error
    };
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorResponse.message = '該電子郵件地址已經被使用。';
        break;
      case 'auth/invalid-email':
        errorResponse.message = '電子郵件地址格式不正確。';
        break;
      case 'auth/weak-password':
        errorResponse.message = '密碼強度不足。';
        break;
      default:
        errorResponse.message = '註冊過程中發生錯誤。';
    }
    throw new Error(errorResponse);
  }
};