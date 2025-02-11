import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ search }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    search(searchTerm.trim() || undefined);
  }

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter search term..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
