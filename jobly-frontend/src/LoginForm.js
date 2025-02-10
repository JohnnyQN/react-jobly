import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ login }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      let token = await login(formData);
      if (token) {
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setErrors(["Invalid username or password. Please try again."]);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {errors.length > 0 && <p style={{ color: "red" }}>{errors.join(", ")}</p>}
    </div>
  );
}

export default LoginForm;
