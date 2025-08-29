import { db } from "./firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  serverTimestamp 
} from "firebase/firestore";

export function addTestDoc(data) {
  return addDoc(collection(db, "test"), {
    ...data,
    timestamp: serverTimestamp()
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  })
  .catch((e) => {
    console.error("Error adding document: ", e);
    throw e;
  });
}

export function getTestDocs() {
  return getDocs(collection(db, "test"))
  .then((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });
    return docs;
  })
  .catch((e) => {
    console.error("Error getting documents: ", e);
    throw e;
  });
}
