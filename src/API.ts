import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBCbAVZb0RWt5z85666rxgHAtkQhqTizOk',
  authDomain: 'to-do-app-2d9d1.firebaseapp.com',
  projectId: 'to-do-app-2d9d1',
  storageBucket: 'to-do-app-2d9d1.appspot.com',
  messagingSenderId: '956966985097',
  appId: '1:956966985097:web:cfc3314c812568f9ac9558',
  measurementId: 'G-D80E1WM0JT',
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export async function getList() {
  const querySnapshot = await getDocs(collection(db, 'todolist_items'));
  querySnapshot.forEach(doc => {
    console.log(`${doc.id} =>`, doc.data());
  });
  return querySnapshot.docs.map(item => ({ ...(item.data() as { name: string; amount: number }), id: item.id }));
}

export function updateListItem(itemID: string, newItem: string) {
  deleteListItem(itemID);
  addListItem(newItem);
}

export async function setListItem() {
  await setDoc(doc(db, 'todolist_items', 'item'), {
    name: 'Apfel',
  });
}

export async function addListItem(data: string) {
  // const docRef = await addDoc(collection(db, 'todolist_items'), {
  //   name: data,
  // });
  await updateDoc(doc(db, 'todolist_items', 'item'), {
    name: arrayUnion(data),
  });
}

export async function deleteListItem(itemID: string) {
  await deleteDoc(doc(db, 'todolist_items', itemID));
}
