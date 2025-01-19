import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { apiClient } from "../service/API/HttpService";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// TODO : Protect the password by converting to base 64 before submission.
const Login = () => {
  const { user, setUser, setLoggedIn, setAuthToken } = useContext(AuthContext);
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState();
  const successMsg = "Authenticated successfully";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user + "," + password);
    const requestObj = { principal: user, credentials: password };
    console.log(JSON.stringify(requestObj));
    try {
      makePostCall("/login", JSON.stringify(requestObj), {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (e) => {
    setUser(e.target.value);
    setErrMsg("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrMsg("");
  };

  const makePostCall = async (reqUrl, requestBody, header) => {
    try {
      console.log("Printing the URL:" + reqUrl);
      const response = await apiClient.post(reqUrl, requestBody, header);
      if (response?.data?.responseCode === 1003) {
        setErrMsg("Invalid password provided");
      } else if (response?.data?.responseCode === 1002) {
        setErrMsg("Missing username or password");
      } else if (response?.data?.responseCode === 2000) {
        console.log(response.data.responseMessage);
        const tokenResult = JSON.parse(response.data.responseMessage);
        console.log(tokenResult.token);
        setErrMsg(successMsg);
        setLoggedIn(true);
        setAuthToken(tokenResult.token);
        setUser(user);
        console.log("User logged in" + { user });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setLoggedIn(false);
      if (!error?.resoponse) {
        setErrMsg("No server response");
      } else if (error?.data?.responseCode === 1002) {
        setErrMsg("Missing username or password");
      } else if (error?.data?.status === 1000) {
        setErrMsg("server error");
      } else if (error?.data?.status === 1003) {
        setErrMsg("Invalid credentails");
      }
    }
  };

  return (
    <div className="container">
      <main className="form-signin w-75 login-form vertical-center center-align">
        <form>
          <div className={errMsg ? "alert alert-danger" : ""} role="alert">
            {errMsg}
          </div>
          <h1 className="h3 mb-3 fw-normal mt-3">Login in</h1>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="emailAddress"
              placeholder="name@example.com"
              onChange={handleNameChange}
            />
            <label htmlFor="emailAddress">Email address</label>
          </div>
          <div className="form-floating ">
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Password"
              autoComplete="off"
              onChange={handlePasswordChange}
            />
            <label htmlFor="pwd">Password</label>
          </div>
          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button
            className="btn btn-primary  py-2 mx-2  mb-3"
            type="submit"
            onClick={handleSubmit}
          >
            Sign in
          </button>
          <button className="btn btn-warning py-2 mx-2 mb-3">
            Forgot Password
          </button>
          <p className="mt-5 mb-3 text-body-secondary">
            &copy; Bolt Task Manager 2017–2024
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;
