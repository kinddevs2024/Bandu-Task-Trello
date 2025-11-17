"use client";

import React, { useState } from "react";
import api from "../api/api";

interface ResetPasswordFormProps {
  onSwitchToLogin: () => void;
}

export default function ResetPasswordForm({ onSwitchToLogin }: ResetPasswordFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"request" | "verify">("request");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Note: The API documentation shows reset-password endpoint but doesn't specify request format
      // We'll assume it needs phone number to send OTP
      await api.post("/auth/reset-password", {
        phoneNumber,
      });
      setStep("verify");
    } catch (err: any) {
      console.error("Reset request error:", err.response?.data || err.message);
      const message = err.response?.data?.message || "Failed to send reset code";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await api.post("/auth/reset-password", {
        phoneNumber,
        otpCode,
        newPassword,
      });
      // Success - redirect to login
      onSwitchToLogin();
    } catch (err: any) {
      console.error("Reset password error:", err.response?.data || err.message);
      const message = err.response?.data?.message || "Failed to reset password";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/20 w-full max-w-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
        Parolni tiklash
      </h2>

      {step === "request" ? (
        <form onSubmit={handleRequestReset}>
          <div className="mb-6">
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
              pattern="^(\+998|998)[0-9]{9}$"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-blue-500/20 hover:bg-blue-500/30 disabled:opacity-50 text-blue-500 rounded-md font-semibold transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-md active:scale-95"
          >
            {isLoading ? "Yuborilmoqda..." : "Kod yuborish"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">
              OTP Kod
            </label>
            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="123456"
              className="w-full px-4 py-2 border border-white/20 rounded-md bg-white/10 dark:bg-black/10 backdrop-blur-md focus:ring-2 focus:ring-blue-500 outline-none text-center text-lg tracking-widest transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              required
              maxLength={6}
              pattern="[0-9]{6}"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">
              Yangi parol
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Yangi parol"
              className="w-full px-4 py-2 border border-white/20 rounded-md bg-white/10 dark:bg-black/10 backdrop-blur-md focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              required
              minLength={6}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-green-500/20 hover:bg-green-500/30 disabled:opacity-50 text-green-500 rounded-md font-semibold transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-md active:scale-95"
          >
            {isLoading ? "Tiklanmoqda..." : "Parolni tiklash"}
          </button>
        </form>
      )}

      <div className="mt-4 text-center">
        <button
          onClick={onSwitchToLogin}
          className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Kirishga qaytish
        </button>
      </div>
    </div>
  );
}
