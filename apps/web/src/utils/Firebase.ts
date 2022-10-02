import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

import firebaseConfig from '../configs/firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function forgotPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

async function logout() {
  signOut(auth);
}

async function setRememberUser(shouldRememberUser: boolean) {
  await setPersistence(auth, shouldRememberUser ? browserLocalPersistence : browserSessionPersistence);
}

async function signInWithFacebook() {
  const facebookProvider = new FacebookAuthProvider();
  const { user } = await signInWithPopup(auth, facebookProvider);

  return user;
}

async function signInWithGoogle() {
  const googleProvider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, googleProvider);

  return user;
}

async function registerWithEmailAndPassword(email: string, password: string) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  return user;
}

async function sendVerificationEmail(user: User) {
  sendEmailVerification(user);
}

async function signInWithEmailPassword(email: string, password: string) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  return user;
}

export {
  auth,
  forgotPassword,
  logout,
  registerWithEmailAndPassword,
  sendVerificationEmail,
  setRememberUser,
  signInWithFacebook,
  signInWithEmailPassword,
  signInWithGoogle,
};
