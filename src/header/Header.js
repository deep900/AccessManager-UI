import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/js/dist/dropdown.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@popperjs/core/dist/cjs/popper.js";

import AuthContext from "../context/AuthContext";
import DynamicMenu from "../login/DynamicMenu";

import "./header.css";
import DynMenu from "../DynMenu";
const Header = () => {
  const { loggedIn, userInfo } = useContext(AuthContext);
  const [sVersion, setsVersion] = useState("1.0");
  const [accessDetailsArr, setAccessDetailsArr] = useState(null);
  useEffect(() => {
    console.log("Printing the user info header:" + JSON.stringify(userInfo));
    setAccessDetailsArr(userInfo?.accessDetails);
  }, [userInfo]);

  useEffect(() => {
    console.log("Loading the software version");
    setsVersion("1.1");
  }, []);

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Access Governance {sVersion}
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            {!loggedIn ? (
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="/login">
                  {" "}
                  Login{" "}
                </a>{" "}
              </li>
            ) : null}
            <DynMenu data={userInfo?.accessDetails} />
            <li
              className={
                "nav-item dropdown float-md-right " +
                (userInfo ? "showNavigation" : "hideNavigation")
              }
            >
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {userInfo?.userEntity?.firstName}
              </a>

              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="/logout">
                    Logout
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    View Profile
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
