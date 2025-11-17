"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sun, Moon, Monitor, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../../public/logo_img.png";

export default function Header() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setAnimate(true), 50); // slide down animation
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const baseButtonClasses =
    "p-2 rounded-full border border-white/20 backdrop-blur-md shadow-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-md active:scale-95";
  const baseButtonClassesbandu =
    " p-[4px] pr-[6px] pl-[6px] rounded-full border border-white/20 backdrop-blur-md shadow-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]  active:scale-95";

  const getThemeButtonClasses = (btnTheme: string) =>
    `${baseButtonClasses} ${theme === btnTheme
      ? "bg-white/30 dark:bg-black/20 scale-105 shadow-md"
      : "bg-white/15 dark:bg-black/10 hover:bg-white/50 dark:hover:bg-black/30"
    }`;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
  };
  const isDark = theme === "dark";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${animate ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"}`}
      >
        <div className=" backdrop-blur-sm max-w-6xl mx-auto flex items-center justify-between px-14 py-3">
          <div className="flex items-center justify-center text-center">
            {/* Logo/Home link */}
            <Link href="/"
                  className={`text-2xl  font-medium  leading-[1.3] transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"
              } `}
            >
              <img src={logo.src} alt="Bandu Logo" className=" m-1 h-6 hidden sm:block" />
            </Link>

            
          </div>

          <div className="flex items-center gap-3">
            {/* Theme buttons */}
            <button
              onClick={() => setTheme("light")}
              className={getThemeButtonClasses("light")}
            >
              <Sun className="w-4 h-4 text-yellow-500 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </button>

            <button
              onClick={() => setTheme("dark")}
              className={getThemeButtonClasses("dark")}
            >
              <Moon className="w-4 h-4 text-gray-400 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </button>

            <button
              onClick={() => setTheme("system")}
              className={getThemeButtonClasses("system")}
            >
              <Monitor className="w-4 h-4 text-blue-400 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </button>

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {user?.firstName} {user?.lastName}
                </span>
                <button
                  onClick={handleLogout}
                  className={`${baseButtonClasses} bg-red-500/20 hover:bg-red-500/30`}
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className={`${baseButtonClasses} bg-blue-500/20 hover:bg-blue-500/30`}
              >
                <User className="w-4 h-4 text-blue-500" />
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
