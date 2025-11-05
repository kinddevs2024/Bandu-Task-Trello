"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export default function Header() {
  const { theme, setTheme } = useTheme();
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

  const getThemeButtonClasses = (btnTheme: string) =>
    `${baseButtonClasses} ${theme === btnTheme
      ? "bg-white/30 dark:bg-black/20 scale-105 shadow-md"
      : "bg-white/15 dark:bg-black/10 hover:bg-white/50 dark:hover:bg-black/30"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${animate ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"}`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-end px-14 py-3">
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
        </div>

      </div>
    </header>
  );
}
