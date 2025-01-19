import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://localhost:8080/taskmanager",
  timeout: 12000,
});

export { apiClient };
