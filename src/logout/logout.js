import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const Logout = () => {
  const { setLoggedIn, setAuthToken, setUser, setUserInfo } =
    useContext(AuthContext);

  useEffect(() => {
    setLoggedIn(null);
    setAuthToken(null);
    setUser(null);
    setUserInfo(null);
  }, []);

  return <div>You have successfully logged out.</div>;
};
export default Logout;
