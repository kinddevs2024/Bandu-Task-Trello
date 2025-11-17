"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

interface OTPVerificationProps {
  phoneNumber: string;
  onSwitchToLogin: () => void;
  onSwitchToRegister: () => void;
}

export default function OTPVerification({ phoneNumber, onSwitchToLogin, onSwitchToRegister }: OTPVerificationProps) {
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const { login } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/auth/verify", {
        phoneNumber,
        otpCode,
      });

      const { token, userRes } = response.data;
      if (token && userRes) {
        login(token, userRes);
      } else {
        setError("Verification failed: Invalid response structure");
      }
    } catch (err: any) {
      console.error("Verification error:", err.response?.data || err.message);
      const message = err.response?.data?.message || "Invalid OTP code";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setError("");
    setIsLoading(true);

    try {
      // Note: The API doesn't have a separate resend endpoint, so we'll call register again
      await api.post("/auth/register", {
        phoneNumber,
        firstName: "", // These might not be needed for resend
        lastName: "",
        password: "",
      });
      setResendTimer(60);
    } catch (err: any) {
      console.error("Resend error:", err.response?.data || err.message);
      const message = err.response?.data?.message || "Failed to resend OTP";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
        Tasdiqlash
      </h2>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
        {phoneNumber} raqamiga yuborilgan 6 xonali kodni kiriting
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">
            OTP Kod
          </label>
          <input
            type="text"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="123456"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none text-center text-lg tracking-widest"
            required
            maxLength={6}
            pattern="[0-9]{6}"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <button
          type="submit"
          disabled={isLoading || otpCode.length !== 6}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-md font-semibold transition-all duration-300"
        >
          {isLoading ? "Tasdiqlanmoqda..." : "Tasdiqlash"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={handleResendOTP}
          disabled={resendTimer > 0 || isLoading}
          className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {resendTimer > 0 ? `Qayta yuborish (${resendTimer}s)` : "Qayta yuborish"}
        </button>
      </div>
      <div className="mt-2 text-center">
        <button
          onClick={onSwitchToRegister}
          className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Orqaga qaytish
        </button>
      </div>
    </div>
  );
}
