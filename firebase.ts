import { getApp, getApps, initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
} from "firebase/firestore";

interface FormPayload {
  title: string;
  questions: Array<object>;
}

interface BriefPayload {
  user: string;
  answers: Array<object>;
}

const firebaseConfig = {
  apiKey: "AIzaSyAoZMkq4ka60cXJCx1m0AlB-6uwiKzrqTU",
  authDomain: "form-collector-5361f.firebaseapp.com",
  projectId: "form-collector-5361f",
  storageBucket: "form-collector-5361f.appspot.com",
  messagingSenderId: "680793230557",
  appId: "1:680793230557:web:32ec92e703a687580b9f34",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getFormList() {
  const q = query(collection(db, "form"));
  const docs = await getDocs(q);
  const data = docs.docs.map((snapshot) => {
    const rawData = snapshot.data();
    rawData.id = snapshot.id;
    return rawData;
  });
  return data;
}

async function getForm(id: string) {
  const document = await getDoc(doc(db, "form", id));
  return document.data();
}

async function addNewForm(payload: FormPayload) {
  const { title, questions } = payload;
  const doc = await addDoc(collection(db, "form"), {
    title,
    questions,
    createdAt: serverTimestamp(),
  });
  return doc.id;
}

async function deleteForm(id: string) {
  await deleteDoc(doc(db, "form", id));
  return;
}

async function getBrief(id: string) {
  const document = await getDoc(doc(db, "brief", id));
  return document.data();
}

async function addNewBrief(payload: BriefPayload) {
  // const { user, answers } = payload;
  const doc = await addDoc(collection(db, "brief"), {
    // user,
    // answers,
    createdAt: serverTimestamp(),
  });
  return doc.id;
}

export { db, addNewBrief, addNewForm, deleteForm, getBrief, getForm, getFormList };
