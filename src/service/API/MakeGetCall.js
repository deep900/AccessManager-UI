import React from "react";
import { apiClient } from "./HttpService";

export const MakeGetCall = async (URL, header) => {
  try {
    const response = await apiClient.get(URL, header);
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
};
