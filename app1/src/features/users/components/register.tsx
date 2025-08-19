"use client";
import { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    roles: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    
    const rolesArray = formData.roles
      .split(",")
      .map((role) => role.trim())
      .filter((role) => role.length > 0);

    try {
      const response = await axios.post("http://localhost:5138/api/auth/register", {
        name: formData.name,
        username: formData.username,
        password: formData.password,
        roles: rolesArray,
      });

      // If the request is successful (status 200)
      if (response.status === 200) {
        setMessage("Registration successful!");
        console.log("Register response:", response.data);
        // You might want to clear the form here
        setFormData({ name: "", username: "", password: "", roles: "" });
      }
    } catch (axiosObj: any) {
      console.error("Register error:", axiosObj);
      const data: any = axiosObj.response.data;
      // This block handles any non-2xx status code from the server
      if (axiosObj.status ) {
      
        setMessage(`Registration failed: ${axiosObj.message}`);
        setMessage(`${data.errors}`);
        
        
        // Handle specific validation errors like "Password must be at least 6 characters long"
      //   if (data?.errors?.Password && data.errors.Password.length > 0) {
      //     setMessage(`Registration failed: ${data.errors.Password[0]}`);
      //   } else if (data?.title) {
      //     // Handle a general validation error title
      //     setMessage(`Registration failed: ${data.title}`);
      //   } else {
      //     // Fallback for other types of server errors
      //     setMessage(`Registration failed: ${data?.message || error.response.statusText}`);
      //   }
      // } else if (error.request) {
      //   // Handle network errors where no response was received
      //   setMessage("No response from server. Please try again later.");
      // } else {
      //   // Handle any other errors during the request setup
      //   setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-gray-500 space-y-4">
      <h2 className="text-xl font-semibold text-center">Register</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
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
      <input
        type="text"
        name="roles"
        placeholder="Roles (comma separated)"
        value={formData.roles}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded"
      >
        Register
      </button>

      {message && <p style={{ marginTop: 16, color: message.includes("successful") ? "green" : "red" }}>{message}</p>}
    </form>
  );
}