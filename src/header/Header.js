import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/js/dist/dropdown.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@popperjs/core/dist/cjs/popper.js";

import AuthContext from "../context/AuthContext";
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
    setsVersion("1.0");
  }, []);

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Access Governance {sVersion}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
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
            ) : (
              <>
                <DynMenu data={userInfo?.accessDetailsMap} />

                <li
                  className={
                    "nav-item dropdown d-flex " +
                    (userInfo ? "showNavigation" : "hideNavigation")
                  }
                >
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userInfo?.userEntity?.firstName}
                  </a>

                  <ul className="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="/logout">
                        Logout
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        View Profile
                      </a>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
