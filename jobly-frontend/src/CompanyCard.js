import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

/** CompanyCard Component
 * 
 * Displays basic information about a company.
 * Clicking on the card will take the user to the company details page.
 * 
 * Props:
 * - handle: unique identifier for the company
 * - name: company name
 * - description: short description of the company
 * - logoUrl (optional): URL for company logo
 * 
 * Usage:
 * <CompanyCard 
 *    handle="apple" 
 *    name="Apple Inc." 
 *    description="Tech company making innovative products"
 *    logoUrl="https://logo.example.com/apple.png"
 * />
 */
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
  
