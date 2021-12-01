import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router'

const LoginView = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await axios.post(`${apiUrl}/auth/login`, user);
    localStorage.setItem("jwtWaitList", JSON.stringify(response.data));
    navigate('/');
  }

  return (
    <div className="container mt-5">
      <form
        style={{
          padding: 20,
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <h2 style={{ fontWeight: "bold" }}>Login</h2>
        <input
          name="email"
          onChange={handleChange}
          style={{ margin: "20px 0" }}
          className="mb-3"
          placeholder="email"
          type="text"
          className="form-control"
        />
        <input
          name="password"
          onChange={handleChange}
          style={{ margin: "20px 0" }}
          className="mt-4"
          placeholder="password"
          type="password"
          className="form-control"
        />
        <button
          onClick={handleSubmit}
          className="btn btn-outline-dark form-control"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginView;
