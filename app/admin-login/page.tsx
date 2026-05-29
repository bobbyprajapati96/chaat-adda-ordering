"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const login = () => {
    if (password === "chaatadda123") {
      localStorage.setItem("adminLoggedIn", "true");
      router.push("/dashboard");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm">
        <h1 className="text-3xl font-bold text-black mb-6">Admin Login</h1>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded-xl w-full text-black mb-4"
        />

        <button
          onClick={login}
          className="bg-black text-white w-full py-3 rounded-xl"
        >
          Login
        </button>
      </div>
    </main>
  );
}
