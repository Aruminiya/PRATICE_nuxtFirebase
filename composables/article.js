import { getApp } from 'firebase/app';
import { 
  getFirestore,
  collection,
  getDocs,
  query,
  limit,
  orderBy,
  addDoc,
  doc,
  getDoc
} from "firebase/firestore";

// 表單驗證工具
import validator from 'validator';

// 初始化 Firestore
let firestore
const initFirestore = () => {
  if (!firestore) {
    const app = getApp();
    firestore = getFirestore(app, 'testdb');
    return firestore
  } else {
    return firestore
  }
}

// 上傳文章
export const uploadArticles = async (postData) => {
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
    await addDoc(collection(initFirestore(), "testComposablePosts"), data);
    return data;
  } catch (error) {
    throw error;
  }
}

// 列出 10 筆文章
export const listArticles = async (limitCount = 10) => {
  try {
    const q = query(collection(initFirestore(), "testComposablePosts"), orderBy("createdAt", "asc"), limit(limitCount));
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

// 取得單一貼文
export const getArticle = async (id) => {
  try {
    const docSnap = await getDoc(doc(initFirestore(), "testComposablePosts", id));
    return {id, ...(docSnap.data())}
  } catch (error) {
    throw error;
  }
}