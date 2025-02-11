import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import SearchForm from "./SearchForm";
import "./Auth.css"; 

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getJobs(title) {
      try {
        let jobResults = await JoblyApi.getJobs(title ? { title } : {});
        setJobs(jobResults);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setIsLoading(false);
      }
    }
    getJobs();
  }, []);

  async function handleSearch(evt) {
    evt.preventDefault();
    setIsLoading(true);
    try {
      let jobResults = await JoblyApi.getJobs(searchTerm ? { title: searchTerm } : {});
      setJobs(jobResults);
    } catch (err) {
      console.error("Error searching jobs:", err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <p>Loading jobs...</p>;

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Jobs</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a job..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {jobs.length ? (
          jobs.map((job) => <JobCard key={job.id} {...job} />)
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default JobList;
