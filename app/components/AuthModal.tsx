"use client";

import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import OTPVerification from "./OTPVerification";
import ResetPasswordForm from "./ResetPasswordForm";
import { GoXCircle, GoXCircleFill } from "react-icons/go";
type AuthView = "login" | "register" | "verify" | "reset";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [currentView, setCurrentView] = useState<AuthView>("login");
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState("");

  if (!isOpen) return null;

  const handleSwitchToRegister = () => setCurrentView("register");
  const handleSwitchToLogin = () => setCurrentView("login");
  const handleSwitchToVerify = (phoneNumber: string) => {
    setVerifyPhoneNumber(phoneNumber);
    setCurrentView("verify");
  };
  const handleSwitchToResetPassword = () => setCurrentView("reset");

  const renderCurrentView = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginForm
            onSwitchToRegister={handleSwitchToRegister}
            onSwitchToResetPassword={handleSwitchToResetPassword}
          />
        );
      case "register":
        return (
          <RegisterForm
            onSwitchToLogin={handleSwitchToLogin}
            onSwitchToVerify={handleSwitchToVerify}
          />
        );
      case "verify":
        return (
          <OTPVerification
            phoneNumber={verifyPhoneNumber}
            onSwitchToLogin={handleSwitchToLogin}
            onSwitchToRegister={handleSwitchToRegister}
          />
        );
      case "reset":
        return (
          <ResetPasswordForm
            onSwitchToLogin={handleSwitchToLogin}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative">
        {renderCurrentView()}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white rounded-full flex items-center justify-center text-xl font-bold"
        >
          <GoXCircleFill className="text-white/40 w-6 h-6 " />
        </button>
      </div>
    </div>
  );
}
