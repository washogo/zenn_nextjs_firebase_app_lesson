import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { User } from "../models/User";
import { atom, useRecoilState } from "recoil";
import { useEffect } from "react";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

async function createUserIfNotFound(user: User) {
  const db = getFirestore();
  const usersCollection = collection(db, "users");
  const userRef = doc(usersCollection, user.uid);
  const document = await getDoc(userRef);
  if (document.exists()) {
    // 書き込みの方が高いので！
    return;
  }

  await setDoc(userRef, {
    name: "taro" + new Date().getTime(),
  });
}

const userState = atom<User>({
  key: "user",
  default: null,
});

export const useAuthentication = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (user !== null) {
      return;
    }

    const auth = getAuth();

    console.log("Start useEffect");

    signInAnonymously(auth).catch(function (error) {
      // Handle Errors here.
      console.log(error);
      // ...
    });

    onAuthStateChanged(auth, function (firebaseUser) {
      if (firebaseUser) {
        const loginUser: User = {
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
          name: "",
        };
        setUser(loginUser);
        createUserIfNotFound(loginUser);
      } else {
        // User is signed out.
        setUser(null);
      }
    });
  }, [setUser, user]);

  return { user };
};
