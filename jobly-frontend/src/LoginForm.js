import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function LoginForm({ login }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setErrors([]);
    
    const result = await login(formData);
    if (result.success) {
      navigate("/");
    } else {
      setErrors(result.errors);
    }
  }

  return (
    <div className="container auth-container">
      <div className="auth-form card p-4 shadow-sm">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <button className="btn btn-primary btn-block mt-3" type="submit">
            Login
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

export default LoginForm;
