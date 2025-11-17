"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import OTPVerification from "./OTPVerification";
import ResetPasswordForm from "./ResetPasswordForm";

type AuthView = "login" | "register" | "verify" | "reset";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [currentView, setCurrentView] = useState<AuthView>("login");
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState("");

  const handleClose = useCallback(() => {
    setCurrentView("login");
    setVerifyPhoneNumber("");
    onClose();
  }, [onClose]);

  // Reset to login view when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentView("login");
      setVerifyPhoneNumber("");
    }
  }, [isOpen]);

  // Add blurred backdrop when modal is open
  useEffect(() => {
    if (isOpen) {
      // Create and add backdrop overlay
      const backdrop = document.createElement('div');
      backdrop.id = 'modal-backdrop-blur';
      backdrop.className = 'fixed inset-0 bg-black/50 backdrop-blur-md z-[9998]';
      backdrop.style.position = 'fixed';
      backdrop.style.top = '0';
      backdrop.style.left = '0';
      backdrop.style.right = '0';
      backdrop.style.bottom = '0';
      backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      backdrop.style.backdropFilter = 'blur(8px)';
      (backdrop.style as any).webkitBackdropFilter = 'blur(8px)';
      backdrop.style.zIndex = '9998';
      backdrop.onclick = handleClose;
      document.body.appendChild(backdrop);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Remove backdrop
      const backdrop = document.getElementById('modal-backdrop-blur');
      if (backdrop) {
        backdrop.remove();
      }
      document.body.style.overflow = '';
    }

    return () => {
      const backdrop = document.getElementById('modal-backdrop-blur');
      if (backdrop) {
        backdrop.remove();
      }
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  const handleSwitchToRegister = () => setCurrentView("register");
  const handleSwitchToLogin = () => setCurrentView("login");
  const handleSwitchToVerify = (phoneNumber: string) => {
    setVerifyPhoneNumber(phoneNumber);
    setCurrentView("verify");
  };
  const handleSwitchToResetPassword = () => setCurrentView("reset");

  // Close modal on successful login/register
  const handleSuccessfulAuth = () => {
    handleClose();
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginForm
            onSwitchToRegister={handleSwitchToRegister}
            onSwitchToResetPassword={handleSwitchToResetPassword}
            onSuccess={handleSuccessfulAuth}
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
            onSuccess={handleSuccessfulAuth}
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

  const getTitle = () => {
    switch (currentView) {
      case "login":
        return "Kirish";
      case "register":
        return "Ro'yxatdan o'tish";
      case "verify":
        return "Tasdiqlash";
      case "reset":
        return "Parolni tiklash";
      default:
        return "";
    }
  };

  return (
    <Dialog
      open={isOpen}
      handler={handleClose}
      size="sm"
      className="bg-white dark:bg-gray-800 w-[400px] h-[700px] rounded-2xl shadow-2xl"
      style={{ 
        zIndex: 9999, 
        width: '400px', 
        height: '700px',
        maxHeight: '90vh',
      }}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -50 },
      }}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
    >
        <DialogHeader 
          className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          <span className="text-2xl font-bold text-gray-800 dark:text-white">{getTitle()}</span>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleClose}
            className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
          >
            <X className="h-5 w-5" />
          </IconButton>
        </DialogHeader>
        <DialogBody 
          className="px-6 py-6"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          {renderCurrentView()}
        </DialogBody>
      </Dialog>
  );
}
