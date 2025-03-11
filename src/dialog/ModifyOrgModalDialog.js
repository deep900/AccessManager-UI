import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ModalDialog = ({ show, handleClose, data }) => {
  const handleSubmitModifyOrg = () => {
    console.log("Inside handle submit modify org");
  };
  const [enableSubmit, setEnableSubmit] = useState(false);

  const updateCountry = () => {
    setEnableSubmit(true);
  };
  const handleOrgNameChange = () => {
    setEnableSubmit(true);
  };
  const handleOrgDescChange = () => {
    setEnableSubmit(true);
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
                    value={data[1]}
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
                    value={data[2]}
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
                      country === data[3] ? (
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmitModifyOrg}
            className={enableSubmit ? "primary-btn" : "disabled"}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default ModalDialog;
