"use client";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSwitchToResetPassword: () => void;
  onSuccess?: () => void;
}

export default function LoginForm({ onSwitchToRegister, onSwitchToResetPassword, onSuccess }: LoginFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", {
        phoneNumber,
        password,
      });

      const { token, userRes } = response.data;
      if (token && userRes) {
        login(token, userRes);
        onSuccess?.();
      } else {
        setError("Login failed: Invalid response structure");
      }
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      const message = err.response?.data?.message || "Invalid credentials or server error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">
            Telefon raqami
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+998901234567"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">
            Parol
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parolingizni kiriting"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-md font-semibold transition-all duration-300"
        >
          {isLoading ? "Kirish..." : "Kirish"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={onSwitchToResetPassword}
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Parolni unutdingizmi?
        </button>
      </div>
      <div className="mt-2 text-center">
        <button
          onClick={onSwitchToRegister}
          className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Hisobingiz yo'qmi? Ro'yxatdan o'ting
        </button>
      </div>
    </>
  );
}
