"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const LoginPage = () => {
  const { setUser, setIsSeller, router } = useAppContext();
  const [form, setForm] = useState({ name: "", email: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      toast.error("Please enter both name and email");
      return;
    }

    try {
    const { data } = await axios.post("/api/user/get-user", form);

    if (data.success) {
      localStorage.setItem("userId", data.user._id);
      setUser(data.user);
      setIsSeller(data.user.isSeller);
      toast.success(`Welcome ${data.user.name}!`);
      router.push("/");
    } else {
      toast.error(data.message);
    }
  } catch (err) {
    toast.error("Login failed");
    console.error("Error loading user:", err);
  }
};
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-80 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Login / Sign Up
        </h2>

        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
