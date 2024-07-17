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
    throw error
  }
};

// 登出
export const userSignout = async () => {
  try {
    const userCredential = await signOut(initAuth());
    return userCredential
  } catch(error) {
    throw error
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
    throw error
  }
};