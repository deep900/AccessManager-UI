import React from "react";
const DynMenu = (data) => {
  const mainMenu = [];
  const subMenu = [];
  var count = 0;
  Object.keys(data).forEach((key) => {
    var obj = data[key];
    if (obj != null) {
      Object.keys(obj).forEach((menu) => {
        mainMenu.push(menu);
        subMenu.push(obj[menu]);
      });
    }
  });
  return (
    <>
      {mainMenu.map((val) => (
        <li className={"nav-item dropdown ml-3 float-md-right showNavigation"}>
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {val}
          </a>
          <ul class="dropdown-menu">
            {subMenu[count]?.map((menuInfo) => (
              <li>
                <a class="dropdown-item" href={menuInfo.frontendUrl}>
                  {" "}
                  {menuInfo.name}{" "}
                </a>
              </li>
            ))}
          </ul>
          {(count = count + 1) > 0 ? "" : ""}
        </li>
      ))}
    </>
  );
};
export default DynMenu;
