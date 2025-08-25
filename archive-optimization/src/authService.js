import { auth } from "./firebase";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export function signInWithGoogle() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("User signed in:", user);
      return user;
    })
    .catch((error) => {
      console.error("Error signing in:", error);
      throw error;
    });
}

export function logOut() {
  return signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
      throw error;
    });
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}
