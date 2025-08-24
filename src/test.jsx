// Test simple pour vérifier les imports
import { auth } from "./firebase";
import { signInWithGoogle, logOut, onAuthChange } from "./authService";

console.log("Firebase auth:", auth);
console.log("Functions:", { signInWithGoogle, logOut, onAuthChange });

export default function TestComponent() {
  return <div>Test OK</div>;
}
