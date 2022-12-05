import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase";

const provider = new GoogleAuthProvider();

const AuthGoogleContext = createContext({});

const AuthGoogleProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadStoreAuth = () => {
      const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
      const sessionUser = sessionStorage.getItem("@AuthFirebase:user");
      if (sessionToken && sessionUser) {
        setUser(JSON.parse(sessionUser));
      }
    };
    loadStoreAuth();
  }, []);

  const loginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const logoutGoogle = () => {
    signOut(auth).then(() => {
      sessionStorage.clear();
      setUser(null);
    }).catch((error) => {
      console.log(error)
    });
  };

  return (
    <AuthGoogleContext.Provider value={{ loginGoogle, signed: !!user , logoutGoogle}}>
      {children}
    </AuthGoogleContext.Provider>
  );
};

export { AuthGoogleContext, AuthGoogleProvider };
