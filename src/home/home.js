import React from "react";
import IsTokenValid from "../components/IsTokenValid";

const home = () => {
  const tokenValid = IsTokenValid();
  return <div className="container"> This is the Home Component</div>;
};

export default home;
