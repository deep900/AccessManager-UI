import React from "react";
import { apiClient } from "./HttpService";

const MakePostCall = async (URL, headers, requestBody) => {
  const response = await apiClient.post(URL, requestBody, headers);
  console.log("Printing the response:" + JSON.stringify(response));
  return response;
};

export default MakePostCall;
