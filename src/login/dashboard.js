import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { apiClient } from "../service/API/HttpService";
import * as ReactBootStrap from "react-bootstrap";
import IsTokenValid from "../components/IsTokenValid";
import { useNavigate } from "react-router-dom";

const URL = "/v1/api/admin/getUserDetails";
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { user, authToken, setUserInfo, userInfo } = useContext(AuthContext);
  const appData = ["Welcome", "Hello", "World"];
  const isTokenAlive = IsTokenValid();
  const navigate = useNavigate();
  /* Loads the application dashboard data from the remote API. */
  useEffect(() => {
    try {
      if (isTokenAlive) {
        const finalUrl =
          URL + "?userEmail=" + user + "&applicationName=TaskManager";
        console.log("Loading the user information: " + finalUrl);
        console.log("Printing the auth token:" + authToken);
        document.title = "TaskManager - Dashboard";
        makeGetCall(finalUrl, {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
            Authorization: "Bearer " + authToken,
          },
        });
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }, [user, authToken]);

  /* Generic function to make a GET method call. */
  const makeGetCall = async (URL, headers) => {
    try {
      const response = await apiClient.get(URL, headers);
      console.log("Printing the response: " + JSON.stringify(response));
      if (response?.status === 500) {
        console.log("Error while fetching the data." + response.data.message);
        setLoading(true);
      } else if (response?.status === 200) {
        console.log("Obtained the user information");
        setUserInfo(response.data);
        setLoading(true);
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <div>
      {loading ? (
        <>
          This is the dashboard page. <br /> Welcome {userInfo?.firstName}{" "}
          {userInfo?.lastName}
        </>
      ) : (
        <>
          <ReactBootStrap.Spinner
            animation="border"
            variant="primary"
            role="status"
            style={{
              width: "5rem",
              height: "5rem",
              position: "absolute",
              top: "40%",
              left: "40%",
            }}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
