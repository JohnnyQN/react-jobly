import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

/** CompanyCard Component */
function CompanyCard({ handle, name, description, logoUrl }) {
  return (
    <Link className="CompanyCard card" to={`/companies/${handle}`}>
      <div className="card-body">
        {logoUrl && <img src={logoUrl} alt={name} className="CompanyCard-logo" />}
        <h5 className="card-title">{name}</h5>  
        <p className="card-text">{description}</p>
      </div>
    </Link>
  );
}

export default CompanyCard;
