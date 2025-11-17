"use client";

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";

interface LoginFormProps {
  onSwitchToRegister?: () => void;
  onSwitchToResetPassword?: () => void;
  onLoginSuccess?: (token: string) => void;
}

export default function LoginForm({ onSwitchToRegister, onSwitchToResetPassword, onLoginSuccess }: LoginFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Use useContext directly to check if AuthContext is available
  const authContext = useContext(AuthContext);

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
      if (token) {
        // Use auth context if available
        if (authContext && userRes) {
          authContext.login(token, userRes);
        }
        // Call onLoginSuccess callback if provided
        if (onLoginSuccess) {
          onLoginSuccess(token);
        }
        // If neither auth context nor callback is available, show error
        if (!authContext && !onLoginSuccess) {
          setError("Login failed: No authentication handler available");
        }
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
    <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/20 w-full max-w-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
        Kirish
      </h2>
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
            className="w-full px-4 py-2 border border-white/20 rounded-md bg-white/10 dark:bg-black/10 backdrop-blur-md focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
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
            className="w-full px-4 py-2 border border-white/20 rounded-md bg-white/10 dark:bg-black/10 backdrop-blur-md focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-blue-500/20 hover:bg-blue-500/30 disabled:opacity-50 text-blue-500 rounded-md font-semibold transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-md active:scale-95"
        >
          {isLoading ? "Kirish..." : "Kirish"}
        </button>
      </form>
      {onSwitchToResetPassword && (
        <div className="mt-4 text-center">
          <button
            onClick={onSwitchToResetPassword}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Parolni unutdingizmi?
          </button>
        </div>
      )}
      {onSwitchToRegister && (
        <div className="mt-2 text-center">
          <button
            onClick={onSwitchToRegister}
            className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Hisobingiz yo'qmi? Ro'yxatdan o'ting
          </button>
        </div>
      )}
    </div>
  );
}
