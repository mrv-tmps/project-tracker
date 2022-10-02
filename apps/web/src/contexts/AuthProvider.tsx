import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential
} from 'firebase/auth';
import { ReactNode, useEffect, useState } from 'react';

import { auth } from '../configs/firebaseConfig';
import { createGenericContext } from '../utils/Context';

type UserContextType = {
  login: (email: string, password: string) => Promise<UserCredential>,
  loginWithGoogle: () => Promise<UserCredential>,
  logout: () => Promise<void>,
  register: (email: string, password: string) => Promise<UserCredential>,
  reset: (email: string) => Promise<void>,
  user: User | null,
}
interface Props {
  children: ReactNode;
}

type User = {
  displayName: string | null,
  email: string | null,
  uid: string,
}

const [useAuth, AuthContextProvider] = createGenericContext<UserContextType>();

const AuthProvider = (props: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

  const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () => signInWithPopup(auth, provider);

  const reset = (email: string) => sendPasswordResetEmail(auth, email);

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  function getValues() {
    return {
      login,
      loginWithGoogle,
      logout,
      register,
      reset,
      user
    };
  }

  return (
    <AuthContextProvider value={getValues()}>
      {loading ? null : props.children}
    </AuthContextProvider>
  );
};

export { AuthProvider, useAuth };
