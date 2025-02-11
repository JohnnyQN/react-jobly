import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";  
import "./Navigation.css";

function NavBar({ currentUser, logout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">Jobly</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link to="/companies" className="nav-link">Companies</Link>
              </li>
              <li className="nav-item">
                <Link to="/jobs" className="nav-link">Jobs</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">{currentUser.username}</Link>
              </li>
              <li className="nav-item">
                <button onClick={logout} className="btn btn-outline-light">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
