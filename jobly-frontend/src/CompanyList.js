import React, { useState, useEffect } from "react";
import JoblyApi from "./api"; 
import { Link } from "react-router-dom";

/** Show list of companies with search functionality. */
function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch companies from API on mount
  useEffect(() => {
    async function fetchCompanies() {
      try {
        let companies = await JoblyApi.getCompanies();
        setCompanies(companies);
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    }
    fetchCompanies();
  }, []); // Runs once on mount

  // Fetch companies based on search term
  async function searchCompanies(name) {
    try {
      let companies = await JoblyApi.getCompanies(name);
      setCompanies(companies);
    } catch (err) {
      console.error("Error searching companies:", err);
    }
  }

  // Handle search input change
  function handleSearchChange(evt) {
    setSearchTerm(evt.target.value);
  }

  // Handle search form submission
  function handleSubmit(evt) {
    evt.preventDefault();
    searchCompanies(searchTerm.trim());
  }

  return (
    <div className="CompanyList">
      <h1>Companies</h1>

      {/* Search Form */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Search for a company..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
        <button type="submit">Search</button>
      </form>

      {/* Display Companies */}
      <div>
        {companies.length ? (
          companies.map((c) => (
            <Link key={c.handle} to={`/companies/${c.handle}`}>
              <div className="CompanyCard">
                <h2>{c.name}</h2>
                <p>{c.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No companies found.</p>
        )}
      </div>
    </div>
  );
}

export default CompanyList;
