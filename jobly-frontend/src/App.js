import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Profile from "./Profile";
import JoblyApi from "./api";
import { jwtDecode } from "jwt-decode";
import UserContext from "./UserContext.js";
import LoadingSpinner from "./LoadingSpinner";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [currentUser, setCurrentUser] = useState(null);

  // When token changes, fetch user info
  useEffect(() => {
    async function fetchUser() {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          JoblyApi.token = token;
          let user = await JoblyApi.getCurrentUser(username);
          setCurrentUser(user);
        } catch (err) {
          console.error("Error loading user info:", err);
          setCurrentUser(null);
        }
      }
    }
    fetchUser();
  }, [token]);

  /** Handles user login */
  async function login(credentials) {
    try {
      let newToken = await JoblyApi.login(credentials);
      setToken(newToken);
      localStorage.setItem("token", newToken);
      return { success: true };
    } catch (err) {
      // Return an object with success:false and the error message(s)
      return { success: false, errors: [err.message] };
    }
  }

  /** Handles user signup */
  async function signup(userData) {
    try {
      let newToken = await JoblyApi.signup(userData);
      setToken(newToken);
      localStorage.setItem("token", newToken);
      return { success: true };
    } catch (err) {
      return { success: false, errors: err };
    }
  }

  /** Handles user logout */
  function logout() {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <BrowserRouter>
        <NavBar currentUser={currentUser} logout={logout} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />
          <Route path="/profile" element={<Profile currentUser={currentUser} />} />
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
