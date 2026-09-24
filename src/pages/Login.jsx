import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!formData.username || !formData.password) {
      setError("Please enter username and password");
      return;
    }

    try {
      const response = await axios.post(
        "https://spicererp-be-4.onrender.com/api/auth/login",
        formData
      );

      const { token, user } = response.data;

      // Save token
      localStorage.setItem("token", token);

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      setMessage(response.data.message);

      // Change this later to your actual home/dashboard page
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>

        <button type="submit">
          Login
        </button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <p>
        Don't have an account?{" "}
        <button onClick={() => navigate("/register")}>
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;