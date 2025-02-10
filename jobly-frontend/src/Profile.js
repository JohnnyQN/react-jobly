import React, { useState } from "react";
import JoblyApi from "./api";

/** Profile Component: Displays and allows editing of user profile */
function Profile({ currentUser }) {
    const INITIAL_STATE = {
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      email: currentUser?.email || "",
      password: "",
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);
  
    function handleChange(evt) {
      const { name, value } = evt.target;
      setFormData(fData => ({ ...fData, [name]: value }));
    }
  
    async function handleSubmit(evt) {
        evt.preventDefault();
        
        // Create a copy of formData, but remove empty passwords
        let updatedData = { ...formData };
        if (!updatedData.password.trim()) delete updatedData.password;
      
        try {
          await JoblyApi.updateUser(currentUser.username, updatedData);
          setSuccess(true);
          setErrors([]);
        } catch (err) {
          setErrors(err);
          setSuccess(false);
        }
      }
  
    return (
      <div className="Profile">
        <h1>Profile</h1>
        <form onSubmit={handleSubmit}>
          <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="New Password (optional)" />
          <button type="submit">Save Changes</button>
        </form>
        {success && <p>Profile updated successfully!</p>}
        {errors.length > 0 && <p>Error: {errors.join(", ")}</p>}
      </div>
    );
  }
  
export default Profile;
