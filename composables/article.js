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
  startAfter,
  getDoc,
  getCountFromServer
} from "firebase/firestore";

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
  if (!postData.title || !postData.content ||
    postData.title.trim() === "" || postData.content.trim() === "") {
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
    const errorResponse = {
      message: '文章上傳失敗。',
      error
    };
    throw new Error(errorResponse);
  }
}

// 列出 10 筆文章
export const listArticles = async (lastVisible = undefined, limitCount = 10) => {
  try {
    let q;
    if (lastVisible) {
      q = query(
        collection(initFirestore(), "testComposablePosts"),
        orderBy("createdAt", "asc"),
        startAfter(lastVisible),
        limit(limitCount)
      );
    } else {
      q = query(
        collection(initFirestore(), "testComposablePosts"),
        orderBy("createdAt", "asc"),
        limit(limitCount)
      );
    }
    const querySnapshot = await getDocs(q);

    // 獲取最後一個文檔，用於下一頁的查詢
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

    const data = querySnapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    return { lastDoc, data } ;
  } catch (error) {
    console.log(error);
    const errorResponse = {
      message: '列出文章失敗。',
      error
    };
    throw new Error(errorResponse);
  }
}

// 獲取文章總數
export const getArticlesCount = async () => {
  try {
    const coll = collection(initFirestore(), "testComposablePosts");
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
  } catch (error) {
    const errorResponse = {
      message: '獲取文章總數失敗。',
      error
    };
    throw new Error(errorResponse);
  }
}

// 取得單一文章
export const getArticle = async (id) => {
  try {
    const docSnap = await getDoc(doc(initFirestore(), "testComposablePosts", id));
    return {id, ...(docSnap.data())}
  } catch (error) {
    const errorResponse = {
      message: '取得單一文章失敗。',
      error
    };
    throw new Error(errorResponse);
  }
}