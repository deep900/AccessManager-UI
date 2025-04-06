import React, { useState } from "react";

const DynamicMenu = (data) => {
  const arr = [];
  console.log("Printing the menu array:" + JSON.stringify(data));
  Object.keys(data).forEach((key) => {
    arr.push(data[key]);
  });
  console.log(JSON.stringify(arr));
  return <></>;
};

export default DynamicMenu;
