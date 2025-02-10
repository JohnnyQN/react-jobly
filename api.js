import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */
class JoblyApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, params = {}, method = "get") {
    console.debug("API Call:", endpoint, params, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = JoblyApi.token ? { Authorization: `Bearer ${JoblyApi.token}` } : {};

    try {
      return (await axios({ url, method, data: params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response?.data?.error?.message || "API request failed";
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Login user and return token
  static async login(credentials) {
    let res = await this.request("auth/token", credentials, "post");
    return res.token;
  }

  // Signup user and return token
  static async signup(userData) {
    let res = await this.request("auth/register", userData, "post");
    return res.token;
  }

  // Get user details
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
}

export default JoblyApi;
