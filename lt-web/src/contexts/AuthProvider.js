import { createContext, useEffect, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../services/firebase";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

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

  const login = (provider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential =
          provider.__proto__.constructor.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
        setError(null);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.clear();
        setUser(null);
        setError(null);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <AuthContext.Provider
      value={{ login, signed: !!sessionStorage.getItem("@AuthFirebase:user"), logout, user , error}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
