import React, { useState, useEffect } from "react";
import JoblyApi from "./api"; 
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";
import "./Auth.css"; 

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCompanies() {
      try {
        let res = await JoblyApi.getCompanies();
        setCompanies(res);
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    }
    fetchCompanies();
  }, []);

  async function searchCompanies(name) {
    try {
      let res = await JoblyApi.getCompanies(name);
      setCompanies(res);
    } catch (err) {
      console.error("Error searching companies:", err);
    }
  }

  function handleSearchChange(evt) {
    setSearchTerm(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    searchCompanies(searchTerm.trim());
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Companies</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Search for a company..." 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
          <button type="submit">Search</button>
        </form>

        {companies.length ? (
          companies.map((company) => <CompanyCard key={company.handle} {...company} />)
        ) : (
          <p>No companies found.</p>
        )}
      </div>
    </div>
  );
}

export default CompanyList;
