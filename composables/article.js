import { getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, limit, orderBy } from "firebase/firestore";

export const initFirestore = () => {
  // 引用初始化的 firebase 實例
  const app = getApp();

  // 初始化 Firestore
  return getFirestore(app, 'testdb');
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