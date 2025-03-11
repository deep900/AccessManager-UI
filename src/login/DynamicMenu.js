import React, { useState } from "react";

const DynamicMenu = (data) => {
  const arr = [];
  Object.keys(data).forEach((key) => {
    arr.push(data[key]);
  });
  console.log(JSON.stringify(arr));
  return (
    <>
      {arr[0]?.map((menu) => (
        <li key={menu?.name}>
          <a class="dropdown-item" href={menu?.frontendUrl}>
            {menu?.name}
          </a>
        </li>
      ))}
    </>
  );
};

export default DynamicMenu;
