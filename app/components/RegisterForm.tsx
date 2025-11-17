"use client";

import React, { useState } from "react";
import api from "../api/api";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onSwitchToVerify: (phoneNumber: string) => void;
}

export default function RegisterForm({ onSwitchToLogin, onSwitchToVerify }: RegisterFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/auth/register", {
        firstName,
        lastName,
        phoneNumber,
        password,
      });

      // API returns OTP code as string
      const otpCode = response.data;
      if (otpCode) {
        onSwitchToVerify(phoneNumber);
      } else {
        setError("Registration failed: Invalid response");
      }
    } catch (err: any) {
      console.error("Registration error:", err.response?.data || err.message);
      const message = err.response?.data?.message || "Registration failed";
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
            Ism
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Ismingiz"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            required
            minLength={2}
            maxLength={50}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">
            Familiya
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Familiyangiz"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            required
            minLength={2}
            maxLength={50}
          />
        </div>
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
            pattern="^(\+998|998)[0-9]{9}$"
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
            placeholder="Parol yarating"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            required
            minLength={6}
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-md font-semibold transition-all duration-300"
        >
          {isLoading ? "Ro'yxatdan o'tish..." : "Ro'yxatdan o'tish"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={onSwitchToLogin}
          className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Hisobingiz bormi? Kirish
        </button>
      </div>
    </>
  );
}
