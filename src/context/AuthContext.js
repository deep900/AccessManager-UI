import React, { useState } from "react";
import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn", null);
  const [authToken, setAuthToken] = useLocalStorage("authToken", null);
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", null);
  const value = {
    user,
    setUser,
    loggedIn,
    setLoggedIn,
    authToken,
    setAuthToken,
    userInfo,
    setUserInfo,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
