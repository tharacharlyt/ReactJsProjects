"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ProfileCard: React.FC = () => {
  // Access token from Redux store
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-xl font-bold text-black">Profile Card</h1>
      <p className="mt-2 text-gray-700">
        Token: {token ? token : "No token found"}
      </p>
    </div>
  );
};

export default ProfileCard;