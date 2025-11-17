"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import AuthModal from "../components/AuthModal";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isAuthenticated) {
      router.push("/admin");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-400">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        }}
      />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3), transparent 50%)",
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(60px) saturate(180%)",
          WebkitBackdropFilter: "blur(60px) saturate(180%)",
        }}
      />
      <div className="relative z-10 w-full max-w-md">
        <AuthModal
          isOpen={true}
          onClose={() => {}}
          showCloseButton={false}
        />
      </div>
    </div>
  );
}

