import React, { useEffect, useContext, useState } from "react";
import { MakeGetCall } from "../service/API/MakeGetCall";
import AuthContext from "../context/AuthContext";
import IsTokenValid from "../components/IsTokenValid";
import { useNavigate } from "react-router-dom";
import MakePostCall from "../service/API/MakePostCall";

const CreateBranch = () => {
  const [orgList, setOrgList] = useState([]);
  const LOAD_ALL_ORG = "/v1/api/admin/getAllOrgListing";
  const CREATE_BRANCH_URL = "/v1/api/admin/createBranch";
  const { authToken } = useContext(AuthContext);
  const [branchName, setBranchName] = useState();
  const [branchDescription, setBranchDescription] = useState();
  const [orgId, setOrgId] = useState();
  const tokenValid = IsTokenValid();
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = useState("");
  const maxLengthDesc = 124;
  const maxLengthName = 49;

  const handleCancel = () => {
    console.log("Clicked cancel button");
    navigate("/");
  };

  const handleCreate = (e) => {
    e.preventDefault();
    console.log("clicked create button");
    submitBranchRequest();
  };

  useEffect(() => {
    console.log("Loading the component");
    loadAllOrg();
  }, []);

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

  const handleBranchNameChange = (e) => {
    setBranchName(e.target.value);
  };

  const handleBranchDescChange = (e) => {
    setBranchDescription(e.target.value);
  };
  const getRequestBody = () => {
    return {
      branchName: branchName,
      branchDescription: branchDescription,
      orgId: 2,
    };
  };

  const clearFields = () => {
    setBranchName("");
    setBranchDescription("");
  };

  const submitBranchRequest = async () => {
    console.log("Trying to create a new branch");
    if (branchName === "" || branchDescription === "") {
      setPopupMessage("Branch name and description cannot be empty.");
      return;
    }
    const reqBody = getRequestBody();
    console.log(reqBody);
    if (tokenValid) {
      const response = await MakePostCall(
        CREATE_BRANCH_URL,
        getHeader(),
        reqBody
      );
      console.log(JSON.stringify(response));
      if (response?.data?.responseCode === 2000) {
        console.log("Branch creation success");
        setPopupMessage("Branch created successfully");
      } else if (response?.data?.responseCode === 1000) {
        setPopupMessage(response?.responseMessage);
      }
      clearFields();
    } else {
      navigate("/login");
    }
  };
  const loadAllOrg = async () => {
    try {
      if (tokenValid) {
        const response = await MakeGetCall(LOAD_ALL_ORG, getHeader());
        console.log("------------------------------");
        console.log(JSON.stringify(response));
        if (response?.data?.responseCode === 2000) {
          setOrgList(response?.data?.data);
        }
        console.log(JSON.stringify(orgList));
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div class="alert alert-success" role="alert">
        <main>
          <b>Create branch</b>
        </main>
      </div>
      <form autoComplete="false">
        <div className="row mb-3 mt-3">
          <label htmlFor="branchName" className="col-sm-2 col-form-label">
            Branch Name
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="branchName"
              onChange={handleBranchNameChange}
              maxLength={maxLengthName}
            />
          </div>
        </div>
        <div className="row mb-3 mt-3">
          <label htmlFor="branchDesc" className="col-sm-2 col-form-label">
            Branch Description
          </label>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control"
              id="branchDesc"
              onChange={handleBranchDescChange}
              maxLength={maxLengthDesc}
            />
          </div>
        </div>
        <div className="row mb-3 mt-3">
          <label htmlFor="orgList" className="col-sm-2 col-form-label">
            Organization
          </label>
          <div className="col-sm-5">
            <select
              className="form-select"
              aria-label="Organization selection"
              id="orgList"
              onChange={(e) => setOrgId(e.target.id)}
            >
              {orgList?.map((orgData) => (
                <option
                  id={orgData.id}
                  value={orgData.orgName}
                  key={orgData.id}
                >
                  {orgData.orgName}
                </option>
              ))}
              ;
            </select>
          </div>
        </div>
        <hr></hr>
        <button
          type="button"
          className="btn btn-warning ml-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
        &nbsp;&nbsp;
        <button
          type="submit"
          className="btn btn-primary ml-10"
          onClick={handleCreate}
        >
          Create
        </button>
      </form>
      <hr />
      <span
        class={
          popupMessage === "" ? "d-none" : "alert alert-primary mt-10 w-100"
        }
        role="alert"
      >
        {popupMessage}
      </span>
    </>
  );
};

export default CreateBranch;
