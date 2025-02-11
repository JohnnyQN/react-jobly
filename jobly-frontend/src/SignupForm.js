import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState([]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await signup(formData);
    if (result.success) {
      navigate("/");
    } else {
      setErrors(result.errors);
    }
  }

  return (
    <div className="container auth-container">
      <div className="auth-form card p-4 shadow-sm">
        <h2 className="text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input className="form-control" name="username" placeholder="Username" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input className="form-control" name="password" type="password" placeholder="Password" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input className="form-control" name="firstName" placeholder="First Name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input className="form-control" name="lastName" placeholder="Last Name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input className="form-control" name="email" type="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <button className="btn btn-success btn-block mt-3" type="submit">
            Sign Up
          </button>
        </form>
        {errors.length > 0 && (
          <div className="alert alert-danger mt-3">
            {errors.map((error, idx) => (
              <p key={idx}>{error}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SignupForm;
