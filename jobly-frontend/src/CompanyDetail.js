import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCard from "./JobCard";

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCompany() {
      try {
        let companyData = await JoblyApi.getCompany(handle);
        setCompany(companyData);
      } catch (err) {
        console.error("Error fetching company details:", err);
      } finally {
        setIsLoading(false);
      }
    }
    getCompany();
  }, [handle]);

  if (isLoading) return <p>Loading company details...</p>;
  if (!company) return <p>Company not found.</p>;

  return (
    <div className="CompanyDetail">
      <h1>{company.name}</h1>
      <p>{company.description}</p>

      <h2>Jobs at {company.name}</h2>
      {company.jobs.length ? (
        company.jobs.map((job) => <JobCard key={job.id} id={job.id} title={job.title} salary={job.salary} equity={job.equity} />)
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
}

export default CompanyDetail;
