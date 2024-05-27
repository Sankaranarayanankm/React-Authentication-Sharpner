import React, { useState, createContext, useContext } from "react";
const authContext = createContext({
  token: "",
  isLogin: false,
  login: (token) => {},
  logout: () => {},
});
const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    // storing the token in local storage
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
  };
  const defaultContext = {
    token,
    isLogin: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <authContext.Provider value={defaultContext}>
      {props.children}
    </authContext.Provider>
  );
};

export const useAuthCtx = () => {
  return useContext(authContext);
};

export default AuthContextProvider;
