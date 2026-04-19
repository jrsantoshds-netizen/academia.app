import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AppUser extends User {
  appRole?: 'athlete' | 'admin';
  appData?: any;
}

interface FirebaseContextType {
  user: AppUser | null;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({ user: null, loading: true });

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUser({ ...firebaseUser, appRole: data.role, appData: data });
          } else {
             // Will catch up after signIn process finishes creating the doc
            setUser(firebaseUser);
          }
        } catch (error) {
          console.error("Error fetching user role", error);
          setUser(firebaseUser); 
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, loading }}>
        {children}
    </FirebaseContext.Provider>
  );
};
