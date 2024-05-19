import React, { useState } from "react";
import axios from "axios";
import {serverAddress} from '../service/backendApi'
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(serverAddress + "/auth/signup", {
        email: email,
        password: password,
        fullName: fullName
      });
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          required
        />
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="full name"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Registration;