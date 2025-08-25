"use client";

import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";
import { AppDispatch } from "@/store";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5138/api/auth/login", {
        username: formData.username,
        password: formData.password,
      });

      // Save only the token in Redux
      const token = response.data.token;
      dispatch(setCredentials({ token, user: {name: "", email: "", role: "", status: ""} }));

      setMessage("Login successful!");
      console.log("Token:", token);

    } catch (error: any) {
      if (error.response) {
        setMessage(`Login failed: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        setMessage("No response from server. Please try again later.");
      } else {
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