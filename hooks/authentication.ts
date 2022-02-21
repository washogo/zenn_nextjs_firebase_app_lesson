import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { User } from "../models/User";
import { atom, useRecoilState } from "recoil";
import { useEffect } from "react";

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

    signInAnonymously(auth).catch(function (error) {
      // Handle Errors here.
      console.log(error);
      // ...
    });

    onAuthStateChanged(auth, function (firebaseUser) {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
        });
      } else {
        // User is signed out.
        setUser(null);
      }
    });
  }, [setUser, user]);

  return { user };
};
