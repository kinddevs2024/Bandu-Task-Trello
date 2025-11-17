"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

interface OTPVerificationProps {
  phoneNumber: string;
  onSwitchToLogin: () => void;
  onSwitchToRegister: () => void;
  onVerifySuccess?: () => void;
}

export default function OTPVerification({ phoneNumber, onSwitchToLogin, onSwitchToRegister, onVerifySuccess }: OTPVerificationProps) {
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
      if (token) {
        // Save token to localStorage immediately
        localStorage.setItem('token', token);
        
        // Save user data if available
        if (userRes) {
          localStorage.setItem('user', JSON.stringify(userRes));
          login(token, userRes);
        } else {
          // If no userRes, create a minimal user object
          const minimalUser = {
            id: 0,
            firstName: '',
            lastName: '',
            phoneNumber: phoneNumber,
            visibility: false,
            roles: []
          };
          localStorage.setItem('user', JSON.stringify(minimalUser));
          login(token, minimalUser);
        }
        
        // Call success callback if provided
        if (onVerifySuccess) {
          // Wait a bit to ensure localStorage is set
          setTimeout(() => {
            onVerifySuccess();
          }, 100);
        }
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
      await api.post("/auth/register", {
        phoneNumber,
        firstName: "",
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
    <div className="relative w-full max-w-md">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 dark:from-indigo-500/30 dark:via-purple-500/30 dark:to-pink-500/30 rounded-3xl blur-xl opacity-50 dark:opacity-30 animate-pulse"></div>
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/30 dark:border-gray-700/50 w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Tasdiqlash
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {phoneNumber} raqamiga yuborilgan 6 xonali kodni kiriting
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              OTP Kod
            </label>
            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="123456"
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 outline-none text-center text-2xl tracking-[0.5em] font-semibold transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-300 dark:hover:border-gray-600"
              required
              maxLength={6}
              pattern="[0-9]{6}"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 flex items-center gap-2 animate-shake">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium flex-1">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || otpCode.length !== 6}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] active:scale-[0.98] transform relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            {isLoading ? (
              <span className="flex items-center justify-center relative z-10">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Tasdiqlanmoqda...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2 relative z-10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tasdiqlash
              </span>
            )}
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <div className="text-center">
            <button
              onClick={handleResendOTP}
              disabled={resendTimer > 0 || isLoading}
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200 underline-offset-4 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendTimer > 0 ? `Qayta yuborish (${resendTimer}s)` : "Qayta yuborish"}
            </button>
          </div>
          <div className="text-center pt-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onSwitchToRegister}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 underline-offset-4 hover:underline inline-flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Orqaga qaytish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

