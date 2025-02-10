import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://react-jobly-backend-4vak.onrender.com";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */
class JoblyApi {
  static token;  // JWT token for requests

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = JoblyApi.token ? { Authorization: `Bearer ${JoblyApi.token}` } : {};
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response?.data?.error?.message || "API request failed";
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Fetch all companies (with optional search term)
  static async getCompanies(name) {
    let res = await this.request("companies", name ? { name } : {});
    return res.companies;
  }

  // Fetch details for a single company
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // Fetch all jobs (with optional filter)
  static async getJobs(title) {
    let res = await this.request("jobs", title ? { title } : {});
    return res.jobs;
  }

  // Add this inside the JoblyApi class
  static async applyToJob(username, jobId) {
    return await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  }

  // Login user and return token
  static async login(credentials) {
    try {
      let res = await this.request("auth/token", credentials, "post");
      return res.token;
    } catch (err) {
      console.error("Login error:", err);
      throw new Error("Invalid username or password. Please try again.");
    }
  }

  // Signup user and return token
  static async signup(userData) {
    try {
      let res = await this.request("auth/register", userData, "post");
      return res.token;
    } catch (err) {
      console.error("Signup error:", err);
      throw err;
    }
  }

  // Get user details
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update user profile */
  static async updateUser(username, data) {
    try {
      const res = await this.request(`users/${username}`, data, "patch");
      return res.user;
    } catch (err) {
      console.error("Update Profile Error:", err);
      throw err;
    }
  }
}

export default JoblyApi;
