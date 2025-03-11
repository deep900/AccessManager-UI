import React, { useEffect, useState, useContext, useRef } from "react";
import { MakeGetCall } from "../service/API/MakeGetCall";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import IsTokenValid from "./IsTokenValid";

const SearchBar = ({
  searchBy,
  componentName,
  updateSearchResFunction,
  resetSearch,
}) => {
  const sFields = [];
  sFields.push(searchBy);
  const cName = componentName;
  console.log("Search fields:" + JSON.stringify(sFields));
  console.log("Printing the componentName:" + componentName);
  const SEARCH_URL = "/v1/api/searchByComponent?";
  const { authToken } = useContext(AuthContext);
  const [searchField, setSearchField] = useState();
  const [searchType, setSearchType] = useState();
  const [searchParam, setSearchParam] = useState();
  const [enableSearchBtn, setEnableSearchBtn] = useState(true);
  const fieldRef = useRef();
  const searchOptionRef = useRef();
  const searchParamRef = useRef();
  const page = 0;
  const recordsPerPage = 5;
  const tokenValid = IsTokenValid();
  const navigate = useNavigate();

  const handleSearchField = (e) => {
    console.log("Search field:" + e.target.value);
    setSearchField(e.target.value);
  };

  const handleSearchType = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchParam = (e) => {
    console.log(JSON.stringify(e.target.value));
    setSearchParam(e.target.value);
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

  const resetSearchFields = () => {
    setSearchParam("");
    resetSearch();
    searchParamRef.current.value = "";
    fieldRef.current.selectedIndex = "0";
    searchOptionRef.current.selectedIndex = "0";
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (tokenValid) {
      const finalUrl =
        SEARCH_URL +
        "component=" +
        cName +
        "&fieldName=" +
        searchField +
        "&searchOption=" +
        searchType +
        "&searchParam=" +
        searchParam +
        "&page=0" +
        "&numOfRecords=5";
      console.log("Clicked" + finalUrl);
      getSearchData(finalUrl);
    } else {
      navigate("/login", { state: { fromSpecificPage: true } });
    }
  };

  const getSearchData = async (finalUrl) => {
    const res = await MakeGetCall(finalUrl, getHeader());
    if (res == null) {
      console.log("Unable to fetch the data.");
    }
    console.log("Printing the org list:" + JSON.stringify(res));
    if (res?.data?.data != null) {
      updateSearchResFunction(res?.data?.data);
    }
  };

  return (
    <>
      <form className="d-flex mt-1">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon3">
            Search By
          </span>
          <select
            className="form-select me-2"
            onChange={handleSearchField}
            ref={fieldRef}
          >
            {sFields[0]?.map((optionVal) => (
              <option key={optionVal}>{optionVal}</option>
            ))}
            ;
          </select>
          <select
            className="form-select me-2"
            onChange={handleSearchType}
            aria-placeholder="Search type"
            ref={searchOptionRef}
          >
            <option key="0">Select</option>
            <option key="1">Contains</option>
            <option key="2">Equals</option>
          </select>
          <input
            type="text"
            class="form-control"
            id="basic-url"
            aria-describedby="basic-addon3"
            onChange={handleSearchParam}
            ref={searchParamRef}
          />
          <button
            className={
              enableSearchBtn
                ? "btn btn-outline-success"
                : "btn btn-outline-success disabled"
            }
            type="submit"
            onClick={handleOnSubmit}
          >
            Search
          </button>
          <button
            className="btn btn-outline-danger ms-1
            "
            type="button"
            onClick={resetSearchFields}
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
