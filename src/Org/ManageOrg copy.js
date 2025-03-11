import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { MakeGetCall } from "../service/API/MakeGetCall";
import AuthContext from "../context/AuthContext";

const ManageOrg = () => {
  const FETCH_ALL_ORG_URL = "/v1/api/admin/getAllOrganization";
  const { authToken } = useContext(AuthContext);
  const [orgData, setOrgData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [showNextButton, setShowNextButton] = useState(true);
  const [showPrevButton, setShowPrevButton] = useState(false);

  useEffect(() => {
    console.log("- - - - - - Loading the organization details - - - - - ");
    const results = getAllOrgData();
  }, []);

  useEffect(() => {
    if (currentPage > 1) {
      setShowPrevButton(true);
    } else if (currentPage <= 1) {
      setShowPrevButton(false);
    }
  }, [currentPage]);

  const getAllOrgData = async () => {
    const res = await MakeGetCall(FETCH_ALL_ORG_URL, getHeader());
    console.log("Printing the org list:" + JSON.stringify(res));
    setOrgData(res?.data?.data);
  };

  const handleNextPage = (e) => {
    console.log(e);
    console.log("Inside next page");
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = (e) => {
    console.log(e);
    console.log("Inside previous page");
    setCurrentPage(currentPage - 1);
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
  return (
    <div>
      <h3>Manage organization</h3>
      <table className="table table-striped table-hover">
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
              <tr>
                <td>{org.id}</td>
                <td>{org.orgName}</td>
                <td>{org.orgDescription}</td>
                <td>{org.country}</td>
                <td>
                  <select>
                    <option>Create</option>
                    <option>Modify</option>
                    <option>Delete</option>
                  </select>
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
          <li className="page-item">
            <span className="page-link" href="#" onClick={handleNextPage}>
              Next
            </span>
          </li>
        </ul>
      </nav>
      <span>{currentPage}</span>
    </div>
  );
};

export default ManageOrg;
