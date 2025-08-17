"use client";
import { useState } from "react";
import { updateUser } from "../userApi";
import { User } from "../user";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
}

export default function EditUserForm({ user }: Props) {
  const router = useRouter();

  // ✅ Defensive check for roles (array or string)
  const initialRoles = Array.isArray(user.roles)
    ? user.roles.join(", ")
    : user.roles || "";

  const [formData, setFormData] = useState({
    name: user.name || "",
    username: user.username || "",
    roles: initialRoles
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      await updateUser(user.userId, {
        name: formData.name,
        username: formData.username,
        // ✅ Convert comma string to array before sending
        roles: formData.roles
          .split(",")
          .map(r => r.trim())
          .filter(r => r.length > 0)
      });
      setMessage("User updated successfully!");
      router.push("/users");
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Failed to update user.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-gray-500 space-y-4">
      <h2 className="text-xl font-semibold text-center">Edit User</h2>

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
        type="text"
        name="roles"
        placeholder="Roles (comma separated)"
        value={formData.roles}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
      >
        Save Changes
      </button>

      {message && (
        <p
          style={{
            marginTop: 16,
            color: message.includes("success") ? "green" : "red"
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}