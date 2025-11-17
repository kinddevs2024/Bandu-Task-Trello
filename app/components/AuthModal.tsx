"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../admin/LoginForm";
import RegisterForm from "./RegisterForm";
import OTPVerification from "./OTPVerification";
import ResetPasswordForm from "../admin/ResetPasswordForm";
import { X } from "lucide-react";

type AuthView = "login" | "register" | "verify" | "reset";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
}

export default function AuthModal({ isOpen, onClose, showCloseButton = true }: AuthModalProps) {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<AuthView>("login");
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSwitchToRegister = () => setCurrentView("register");
  const handleSwitchToLogin = () => setCurrentView("login");
  const handleSwitchToVerify = (phoneNumber: string) => {
    setVerifyPhoneNumber(phoneNumber);
    setCurrentView("verify");
  };
  const handleSwitchToResetPassword = () => setCurrentView("reset");

  const handleLoginSuccess = () => {
    // Redirect to admin panel after successful login
    // Use window.location.href for full page reload to ensure AuthContext loads token
    setTimeout(() => {
      const token = localStorage.getItem('token');
      if (token) {
        window.location.href = "/admin";
      } else {
        // Wait a bit more if token not found yet
        setTimeout(() => {
          const checkToken = localStorage.getItem('token');
          if (checkToken) {
            window.location.href = "/admin";
          } else {
            console.error("Token not found in localStorage after login");
          }
        }, 200);
      }
    }, 200);
  };

  const handleVerifySuccess = () => {
    // Redirect to admin panel after successful verification
    // Use window.location.href for full page reload to ensure AuthContext loads token
    setTimeout(() => {
      const token = localStorage.getItem('token');
      if (token) {
        window.location.href = "/admin";
      } else {
        // Wait a bit more if token not found yet
        setTimeout(() => {
          const checkToken = localStorage.getItem('token');
          if (checkToken) {
            window.location.href = "/admin";
          } else {
            console.error("Token not found in localStorage after verification");
          }
        }, 200);
      }
    }, 200);
  };

  const handleClose = () => {
    setCurrentView("login");
    setVerifyPhoneNumber("");
    onClose();
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginForm
            onSwitchToRegister={handleSwitchToRegister}
            onSwitchToResetPassword={handleSwitchToResetPassword}
            onLoginSuccess={handleLoginSuccess}
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
            onVerifySuccess={handleVerifySuccess}
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
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && showCloseButton) {
          handleClose();
        }
      }}
    >
      <div 
        className="relative w-full max-w-md animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        {showCloseButton && (
          <button
            onClick={handleClose}
            className="absolute -top-12 right-0 z-10 p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        )}

        {/* Content */}
        <div className="relative">
          {renderCurrentView()}
        </div>
      </div>
    </div>
  );
}
