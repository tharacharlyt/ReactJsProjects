"use client";

import { useState } from "react";
import Card from "./components/card";
import Login from "./components/login";
import Register from "./components/register";

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-dvh grid place-items-center bg-gray-50 p-6">
      <Card>
        {isLogin ? <Login /> : <Register />}

        <div className="mt-4 text-center text-gray-500">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <button
                className="text-blue-500 underline"
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                className="text-blue-500 underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </p>
          )}
        </div>
      </Card>
    </main>
  );
}