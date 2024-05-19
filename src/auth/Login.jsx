import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { serverAddress } from '../service/backendApi'


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(serverAddress + "/auth/login", {
        email: email,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/PrimaryPage");
    } catch (error) {
      console.error("Authentication failed:", error);
      setToken(null);
      localStorage.removeItem("token");
      // if (error.response && error.response.data) {
      //   setErrorMessage(error.response.data); // Set the error message if present in the error response
      // } else {
      //   setErrorMessage("An unexpected error occurred. Please try again.");
      // }
      setErrorMessage("Could not login! Check credentials.");
    }
  };

  return (
    <div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <button style={{marginLeft: "25px"}} onClick={() => {navigate("/register")()}}>  Register Instead</button>
    </div>
  );
};

export default Login;