"use client";
import { useState } from "react";
import axios from "axios";
import React from "react";


export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("default message");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post("http://localhost:5138/api/auth/login", {
        // "username":"Athira1",
        // "password":"Athira23"
        "username": formData.username,
        "password": formData.password
      });

      setMessage("Login successful!");
      console.log("Login response:", response.data.token);

      // Example: save token
      // localStorage.setItem("token", response.data.token);

    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 2xx
        setMessage(`Login failed: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        setMessage("No response from server. Please try again later.");
      } else {
        // Something else happened
        setMessage("An error occurred. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-gray-500">
      <h2 className="text-xl font-semibold text-center">Login</h2>

      <input
        type="username"
        name="username"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
      >
        Login
      </button>
      {message && <p style={{ marginTop: 16 }}>{message}</p>}
    </form>

  );
}