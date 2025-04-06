import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import IsTokenValid from "../components/IsTokenValid";
import MakePostCall from "../service/API/MakePostCall";

const ModalDialog = ({ show, handleClose, data, setShowModal }) => {
  const MODIFY_ORG_URL = "/v1/api/admin/change/submitRequest";
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const tokenAvailable = IsTokenValid();
  const handleSubmitModifyOrg = () => {
    console.log("Inside handle submit modify org");
    //setShowModal(false);
    makeModifyPostCall();
  };
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [orgId, setOrgId] = useState(data[0]);
  const [orgName, setOrgName] = useState(data[1]);
  const [orgDesc, setOrgDesc] = useState();
  const [countryInfo, setCountryInfo] = useState();
  const [alertBg, setAlertBg] = useState("alert-warning");
  const [errorMsg, setErrorMsg] = useState(
    "Note: This request will be sent for an approval process"
  );

  const updateCountry = (e) => {
    setEnableSubmit(true);
    setCountryInfo(e.target.value);
  };
  const handleOrgNameChange = (e) => {
    setEnableSubmit(true);
    setOrgName(e.target.value);
  };
  const handleOrgDescChange = (e) => {
    setEnableSubmit(true);
    setOrgDesc(e.target.value);
  };

  useEffect(() => {
    setOrgName(data[1]);
    setOrgDesc(data[2]);
    setCountryInfo(data[3]);
    setErrorMsg("Note: This request will be sent for an approval process");
  }, [data]);

  const getRequestBody = () => {
    return {
      requestName: "change-org" + "-" + data[0],
      changedRequest: orgName + "," + orgDesc + "," + countryInfo,
      status: "PENDING",
      requestorUserId: 1,
    };
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

  const makeModifyPostCall = async () => {
    try {
      if (!tokenAvailable) {
        console.log("redirect to login page");
        navigate("/login");
      } else {
        const response = await MakePostCall(
          MODIFY_ORG_URL,
          getHeader(),
          getRequestBody()
        );
        if (response?.data?.responseCode === 2000) {
          console.log(
            "Modify request for modify org has been placed successfully."
          );
          setErrorMsg(
            "Request placed successfully - Request Id:" + response?.data?.data
          );
          setAlertBg("alert-success");
        } else if (response?.data?.responseCode === 1000) {
          console.log("Modify org failed");
          setErrorMsg("Request failed");
          setAlertBg("alert-primary");
        } else if (response?.data?.responseCode === 1008) {
          console.log("Org change request is already pending for approval.");
          setErrorMsg("Request already pending for approval.");
          setAlertBg("alert-primary");
        }
        console.log(JSON.stringify(response));
      }
    } catch (err) {
      if (!err.response) {
        console.log("No response");
      } else if (err?.response?.status === 400) {
        setErrorMsg("Bad request");
        console.log("Bad request.");
      }
    }
  };

  const countryList = ["India", "Singapore", "Dubai"];
  return (
    <form>
      <Modal className="container" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Organization </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="d-none">{data[0]}</label>
          <table className="table table-striped table-hover table-bordered">
            <tbody>
              <tr>
                <td>Org Name</td>
                <td>
                  <input
                    className="col-sm-12 form-control"
                    type="text"
                    id="orgName"
                    value={orgName}
                    onChange={handleOrgNameChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Org Description</td>
                <td>
                  <input
                    className="col-sm-12 form-control"
                    type="text"
                    id="orgDesc"
                    value={orgDesc}
                    onChange={handleOrgDescChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Country</td>
                <td>
                  <select
                    className="col-sm-12 form-select"
                    id="country"
                    onChange={updateCountry}
                  >
                    {countryList.map((country) =>
                      country === countryInfo ? (
                        <option value={country} selected>
                          {country}
                        </option>
                      ) : (
                        <option value={country}>{country}</option>
                      )
                    )}
                    ;
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmitModifyOrg}
            className={enableSubmit ? "primary-btn ml-3" : "disabled ml-3"}
          >
            Submit
          </Button>
        </Modal.Footer>
        <Modal.Footer>
          <div
            className={
              errorMsg.includes("Note:")
                ? "alert alert-warning w-100 p-3 mx-auto"
                : "alert alert-primary w-100 p-3 mx-auto"
            }
            role="alert"
          >
            <strong>{errorMsg}</strong>
          </div>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default ModalDialog;
