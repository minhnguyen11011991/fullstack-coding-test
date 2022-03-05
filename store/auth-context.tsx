import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { auth } from '../firebase';

export const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  signUp: ({ email, password }) => { },
  login: ({ email, password }) => { },
  logout: () => { }
});

export const AuthContextProvider = (props) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const userIsLoggedIn = !!user;

  const signUpHandler = ({ email, password }) => {
    auth.createUserWithEmailAndPassword(email, password).then(async (res) => {
      setUser(res.user)
      router.push('/');
    });
  };

  const loginHandler = ({ email, password }) => {
    auth.signInWithEmailAndPassword(email, password).then(async (res) => {
      setUser(res.user)
      router.push('/');
    });
  };

  const logoutHandler = () => {
    auth.signOut();
    setUser(null);
    router.push('/');
  };

  useEffect(() => {
    const cancelAuthListener = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user)
      } else {
        router.push('/auth');
      }
    });
    return () => {
      cancelAuthListener();
    };
  }, []);

  const contextValue = {
    user,
    isLoggedIn: userIsLoggedIn,
    signUp: signUpHandler,
    login: loginHandler,
    logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}
