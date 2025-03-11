import React, { useContext, useState, useEffect } from "react";
import MakePostCall from "../service/API/MakePostCall";
import AuthContext from "../context/AuthContext";
import ModalDialog from "../dialog/ModifyOrgModalDialog";
import { useNavigate } from "react-router-dom";
import IsTokenValid from "../components/IsTokenValid";

const CreateOrg = () => {
  const [orgName, setOrgName] = useState("");
  const [orgDescription, setOrgDescription] = useState("");
  const [country, setCountry] = useState("");
  const [creationSuccess, setCreationSuccess] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const CREATE_ORG_URL = "/v1/api/admin/addOrganization";
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const tokenAvailable = IsTokenValid();

  useEffect(() => {
    console.log("Loading the create org component");
    if (!tokenAvailable) {
      navigate("/login", { state: { fromSpecificPage: true } });
    }
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    console.log(
      "Printing the org name:" +
        orgName +
        ", \n printing the description:" +
        orgDescription
    );
    makeHttpPostCall();
  };

  const getHeader = () => {
    console.log("Printing the auth token" + authToken);
    return {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + authToken,
      },
      withCredentials: true,
    };
  };

  const getRequestBody = () => {
    return {
      orgName: orgName,
      orgDescription: orgDescription,
      country: country,
    };
  };

  const makeHttpPostCall = async () => {
    try {
      if (!tokenAvailable) {
        console.log("redirect to login page");
        navigate("/login");
      } else {
        const response = await MakePostCall(
          CREATE_ORG_URL,
          getHeader(),
          getRequestBody()
        );
        if (response?.data?.responseCode === 2000) {
          console.log("Organization created successfully.");
          setCreationSuccess(true);
          setPopupMessage("Organization created successfully");
        } else if (response?.data?.responseCode === 1000) {
          console.log("Organization creation failed.");
          setCreationSuccess(false);
          setPopupMessage("Organization already exists");
        }
        console.log(JSON.stringify(response));
      }
    } catch (err) {
      if (!err.response) {
        console.log("No response");
      } else if (err?.response?.status === 400) {
        console.log("Bad request.");
        setCreationSuccess(true);
        setPopupMessage("Bad request");
      }
    }
  };

  const handleCancel = () => {
    setOrgDescription("");
    setOrgName("");
    setCreationSuccess(false);
  };

  const handleOrgName = (e) => {
    console.log("Printing the org name:" + e.target.value);
    setOrgName(e.target.value);
    setPopupMessage("");
  };
  const handleOrgDesc = (e) => {
    console.log("Printing the org desc: " + e.target.value);
    setOrgDescription(e.target.value);
    setPopupMessage("");
  };
  return (
    <>
      <form>
        <div class="row mb-3 mt-3">
          <label for="inputEmail3" className="col-sm-2 col-form-label">
            Organization Name
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="orgname"
              onChange={handleOrgName}
              value={orgName}
            />
          </div>
        </div>
        <div className="row mb-3 mt-3">
          <label for="inputPassword3" className="col-sm-2 col-form-label">
            Organization Description
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="orgdescription"
              onChange={handleOrgDesc}
              value={orgDescription}
            />
          </div>
        </div>
        <div className="row mb-3 mt-3">
          <label for="inputPassword3" className="col-sm-2 col-form-label">
            Country
          </label>
          <div className="col-sm-5">
            <select
              class="form-select"
              aria-label="Country selection"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option selected>Select a country</option>
              <option value="Singapore">Singapore</option>
              <option value="India">India</option>
              <option value="Dubai">Dubai</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary ms-10"
          onClick={handleCreate}
        >
          Create
        </button>
        <button
          type="button ms-5"
          className="btn btn-warning"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
      <ModalDialog
        content={popupMessage}
        creationSuccess={creationSuccess}
      ></ModalDialog>
    </>
  );
};

export default CreateOrg;
