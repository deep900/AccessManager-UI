import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import login from "./login/login";
import logout from "./logout/logout.js";
import pageNotFound from "./pageNotFound";
import React from "react";
import Header from "./header/Header.js";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/bootstrap/js/dist/dropdown.js";
import "../node_modules/bootstrap/js/dist/popover.js";
import "../node_modules/bootstrap/js/dist/util/index.js";
import Dashboard from "./login/dashboard.js";
import { AuthProvider } from "./context/AuthContext.js";

import home from "./home/home";
function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <div className="container">
          <Header></Header>
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={home} />
              <Route path="/login" Component={login} />
              <Route path="/logout" Component={logout} />
              <Route path="/dashboard" Component={Dashboard} />
              <Route path="*" Component={pageNotFound} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
