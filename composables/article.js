import { getApp } from 'firebase/app';
import { 
  getFirestore,
  collection,
  getDocs,
  query,
  limit,
  orderBy,
  addDoc,
} from "firebase/firestore";

// 表單驗證工具
import validator from 'validator';

export const initFirestore = () => {
  // 引用初始化的 firebase 實例
  const app = getApp();

  // 初始化 Firestore
  return getFirestore(app, 'testdb');
}

// 上傳文章
export const uploadArticles = async (firestore, postData) => {
  if ( validator.isEmpty(postData.title) || validator.isEmpty(postData.content)) {
    throw new Error("文章標題和內容不得為空");
  }

  try {
    const data = {
      createdAt: new Date(),
      title: postData.title,
      image: postData.image || "",
      content: postData.content
    }
    await addDoc(collection(firestore, "testComposablePosts"), data);
    return data;
  } catch (error) {
    throw error;
  }
}

// 列出 10 筆文章
export const listArticles = async (firestore, limitCount = 10) => {
  try {
    const q = query(collection(firestore, "testComposablePosts"), orderBy("createdAt", "asc"), limit(limitCount));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => {
      return { 
        id: doc.id,
        ...doc.data()
      }
    });
    return data;
  } catch (error) {
    throw error;
  }
}