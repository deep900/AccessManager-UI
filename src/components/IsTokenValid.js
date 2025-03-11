import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
/**
 * This function is to find if the JWT token is valid and can be used for API calls.
 * @returns
 */
const IsTokenValid = () => {
  const { setUser, setLoggedIn, setAuthToken, setUserInfo } =
    useContext(AuthContext);
  const resetValues = () => {
    console.log("Token expired.");
    setUser(null);
    setLoggedIn(false);
    setAuthToken(null);
    setUserInfo(null);
  };
  const { authToken } = useContext(AuthContext);
  try {
    console.log("Trying to validate the auth token " + { authToken });
    if (authToken != null) {
      const decodedToken = jwtDecode(authToken);
      const currentDate = new Date();
      console.log("Printing the decoded token " + JSON.stringify(decodedToken));
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        resetValues();
        return false;
      } else {
        return true;
      }
    } else {
      console.log("No token present.");
      resetValues();
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default IsTokenValid;
