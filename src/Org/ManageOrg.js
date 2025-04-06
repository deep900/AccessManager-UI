import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MakeGetCall } from "../service/API/MakeGetCall";
import AuthContext from "../context/AuthContext";
import SearchBar from "../components/SearchBar";
import IsTokenValid from "../components/IsTokenValid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faSolid, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModifyOrgModalDialog from "../dialog/ModifyOrgModalDialog";

const ManageOrg = () => {
  const FETCH_ALL_ORG_URL = "/v1/api/admin/getAllOrganization";
  const { authToken } = useContext(AuthContext);
  const [orgData, setOrgData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [showNextButton, setShowNextButton] = useState(true);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [recordCounter, setRecordCounter] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  let x = 0;

  const searchBy = ["Select", "Org Name", "Org Description", "Country"];
  const componentName = "Organization";
  const tokenValid = IsTokenValid();
  const navigate = useNavigate();
  // --- Modal window settings -- //
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [editInfo, setEditInfo] = useState([]);

  const searchRecordsById = (id) => {
    return orgData.filter((rec) => rec.id == id);
  };

  const editOrgBody = (val) => {
    console.log("Printing the object id:" + val);
    const info = [];
    const xVal = searchRecordsById(val);
    console.log("Printing the val:" + JSON.stringify(xVal));
    info.push(xVal[0]?.id);
    info.push(xVal[0]?.orgName);
    info.push(xVal[0]?.orgDescription);
    info.push(xVal[0]?.country);
    setEditInfo(info);
  };

  const updateSearchResults = (results) => {
    setSearchResults(results);
    setOrgData(results?.content);
  };

  useEffect(() => {
    console.log("Loading the org data.");
    const results = getAllOrgData();
  }, [currentPage]);

  useEffect(() => {
    if (currentPage >= 1) {
      setShowPrevButton(true);
    } else if (currentPage < 1) {
      setShowPrevButton(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (recordCounter < recordsPerPage) {
      setShowNextButton(false);
    } else {
      setShowNextButton(true);
    }
  }, [recordCounter]);

  const getAllOrgData = async () => {
    try {
      if (tokenValid) {
        const final_url =
          FETCH_ALL_ORG_URL +
          "?page=" +
          currentPage +
          "&numOfRecords=" +
          recordsPerPage;
        console.log(final_url);
        const res = await MakeGetCall(final_url, getHeader());
        if (res == null) {
          console.log("Unable to fetch the data.");
        }
        console.log("Printing the org list:" + JSON.stringify(res));
        setOrgData(res?.data?.data);
        setRecordCounter(res?.data?.data.length);
      } else {
        console.log("Routing to login page as the token has already expired.");
        navigate("/login");
      }
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  const handleNextPage = (e) => {
    x = 0;
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = (e) => {
    setCurrentPage(currentPage - 1);
  };

  const incrementRecCounter = () => {
    setRecordCounter(recordCounter + 1);
  };

  const resetSearch = () => {
    getAllOrgData();
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

  const handleEditOrg = (e) => {
    console.log("Inside handle edit org " + e.target.id);
    editOrgBody(e.target.id);
    handleShowModal();
  };
  return (
    <div>
      <div class="alert alert-success" role="alert">
        <h4>Manage organization</h4>
      </div>
      <SearchBar
        searchBy={searchBy}
        componentName={componentName}
        updateSearchResFunction={updateSearchResults}
        resetSearch={resetSearch}
      ></SearchBar>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Org Name</th>
            <th scope="col">Org Description</th>
            <th scope="col">Country</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {orgData?.map((org) => (
            <>
              {(x = x + 1) > 0 ? "" : ""}
              <tr>
                <td>{org.id}</td>
                <td>{org.orgName}</td>
                <td>{org.orgDescription}</td>
                <td>{org.country}</td>
                <td>
                  <div className="mx-auto">
                    <span className="ms-1 text-primary">
                      <FontAwesomeIcon
                        icon={faPencil}
                        id={org.id}
                        onClick={handleEditOrg}
                        className="url"
                      />{" "}
                      <a onClick={handleEditOrg} id={org.id} className="url">
                        Edit
                      </a>
                    </span>
                    <span className="ms-1 text-success"> | </span>
                    <span className="ms-2 text-danger">
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </span>
                  </div>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <nav aria-label="">
        <ul className="pagination">
          <li className={showPrevButton ? "page-item" : "page-item disabled"}>
            <span className="page-link" onClick={handlePreviousPage}>
              Previous
            </span>
          </li>
          <li className={showNextButton ? "page-item" : "page-item disabled"}>
            <span className="page-link" href="#" onClick={handleNextPage}>
              Next
            </span>
          </li>
        </ul>
      </nav>
      <span>{"Showing records : Page " + currentPage}</span>
      <ModifyOrgModalDialog
        show={showModal}
        handleClose={handleCloseModal}
        data={editInfo}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default ManageOrg;
