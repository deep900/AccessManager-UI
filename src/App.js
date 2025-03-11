import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/bootstrap/js/dist/dropdown.js";
import "../node_modules/bootstrap/js/dist/popover.js";
import "../node_modules/bootstrap/js/dist/util/index.js";
import Dashboard from "./login/dashboard.js";
import { AuthProvider } from "./context/AuthContext.js";
import home from "./home/home";
import CreateOrg from "./Org/CreateOrg.js";
import login from "./login/login";
import Logout from "./logout/Logout.js";
import pageNotFound from "./pageNotFound";
import React from "react";
import Header from "./header/Header.js";
import ManageOrg from "./Org/ManageOrg.js";
function App() {
  return (
    <React.StrictMode>
      <div className="container">
        <AuthProvider>
          <Header></Header>
          <BrowserRouter>
            <Routes children={{ Dashboard, CreateOrg }}>
              <Route path="/" Component={home} />
              <Route path="/login" Component={login} />
              <Route path="/logout" Component={Logout} />
              <Route path="/dashboard" Component={Dashboard} />
              <Route path="/createOrg" Component={CreateOrg} />
              <Route path="/modifyOrg" Component={ManageOrg} />
              <Route path="*" Component={pageNotFound} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </React.StrictMode>
  );
}

export default App;
