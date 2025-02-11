import React, { useContext, useState, useEffect } from "react";
import JoblyApi from "./api";
import UserContext from "./UserContext";
import "./JobCard.css";

function JobCard({ id, title, salary, equity }) {
  const { currentUser } = useContext(UserContext);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.applications.includes(id)) {
      setApplied(true);
    }
  }, [currentUser, id]);

  async function applyToJob() {
    if (applied) return;
    try {
      await JoblyApi.applyToJob(currentUser.username, id);
      setApplied(true);
    } catch (err) {
      console.error("Error applying to job:", err);
    }
  }

  return (
    <div className="JobCard">
      <h3>{title}</h3>
      <p>Salary: {salary ? `$${salary.toLocaleString()}` : "N/A"}</p>
      <p>Equity: {equity ? equity : "N/A"}</p>
      <button onClick={applyToJob} disabled={applied}>
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;
