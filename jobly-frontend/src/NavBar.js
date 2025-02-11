import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";  
import "./Navigation.css";

function NavBar({ currentUser, logout }) {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-links">Home</Link>
      {currentUser ? (
        <>
          <Link to="/companies" className="nav-links">Companies</Link>
          <Link to="/jobs" className="nav-links">Jobs</Link>
          <Link to="/profile" className="nav-links">{currentUser.username}</Link>
          <button onClick={logout} className="nav-links logout-btn">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-links">Login</Link>
          <Link to="/signup" className="nav-links">Sign Up</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
