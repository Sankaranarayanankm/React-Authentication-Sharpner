import React, { useState, createContext, useContext } from "react";
const authContext = createContext({
  token: "",
  isLogin: false,
  login: (token) => {},
  logout: () => {},
});
const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");

  const loginHandler = (token) => {
    console.log(token)
    setToken(token);
  };
  const logoutHandler = () => {
    setToken("");
  };
  const defaultContext = {
    token,
    isLogin: token.length > 0,
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
