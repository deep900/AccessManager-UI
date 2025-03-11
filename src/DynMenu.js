import React from "react";
import { useState } from "react";

const DynMenu = (data) => {
  var arr = [];
  const mainMenu = [];

  Object.keys(data).forEach((key) => {
    arr.push(data[key]);
  });
  mainMenu.push(arr?.[0]?.[0]);
  return (
    <>
      <li
        className={
          "nav-item dropdown float-md-right " +
          (data ? "showNavigation" : "hideNavigation")
        }
      >
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {mainMenu?.map((mMenu) => mMenu?.name)}
        </a>
        <ul class="dropdown-menu">
          {arr[0]?.map((info) => (
            <li>
              {info.frontendUrl === "" ? (
                ""
              ) : (
                <>
                  <a class="dropdown-item" href={info?.frontendUrl}>
                    {" "}
                    {info?.name}
                  </a>
                  <hr class="dropdown-divider" />
                </>
              )}
            </li>
          ))}
        </ul>
      </li>
    </>
  );
};

export default DynMenu;
