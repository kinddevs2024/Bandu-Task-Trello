"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useTheme } from "next-themes";

type Task = {
  id: number;
  task: string;
  completed: boolean;
};

type Step = {
  id: number;
  title: string;
  isCompleted: boolean;
  tasks?: Task[];
  result?: string;
};

export default function Roadmap() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await fetch("/api/roadmap");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setSteps(data);
        setLoading(false);
      } catch (error: any) {
        console.error("Fetch error:", error.message);
        setError("Failed to fetch roadmap");
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, []);

  const activeIndex = useMemo(
    () => steps.findIndex((s) => !s.isCompleted),
    [steps]
  );

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <section
      className={`py-10 overflow-x-hidden transition-colors duration-300 ${
        isDark ? "bg-black" : "bg-gray-100"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-8 transition-colors duration-300 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Loyihaning Roadmapi
        </h2>

        {loading && (
          <div className="text-center text-gray-500">Loading roadmap...</div>
        )}
        {error && <div className="text-center text-red-500">{error}</div>}

        {!loading && !error && (
          <div className="grid gap-6">
            {steps.map((step, idx) => {
              const isCompleted = step.isCompleted;
              const isActive = idx === activeIndex;
              const isFuture = idx > activeIndex && activeIndex !== -1;

              let containerClass =
                "rounded-2xl p-6 border transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-md";

              if (isCompleted) {
                containerClass += isDark
                  ? " bg-black/20 border-gray-700 text-gray-300 shadow-sm"
                  : " bg-white/30 border-gray-200 text-gray-600 shadow-sm";
              } else if (isActive) {
                containerClass += isDark
                  ? " bg-blue-900/30 border-yellow-400 shadow-[0_10px_30px_rgba(59,130,246,0.2)] ring-1 ring-yellow-600"
                  : " bg-white/40 border-yellow-300 shadow-[0_10px_30px_rgba(59,130,246,0.08)] ring-1 ring-yellow-300";
              } else if (isFuture) {
                containerClass += isDark
                  ? " bg-gray-800/20 border-gray-700 text-gray-400"
                  : " bg-gray-50/50 border-gray-100 text-gray-500";
              } else {
                containerClass += isDark
                  ? " bg-gray-900/20 border-gray-700 text-gray-200"
                  : " bg-white/30 border-gray-200 text-gray-700";
              }

              return (
                <div key={step.id} className={containerClass}>
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex items-center justify-center w-11 h-11 rounded-lg font-semibold text-sm shadow-sm transition-colors duration-300 ${
                          isCompleted
                            ? isDark
                              ? "bg-gray-800 text-gray-400"
                              : "bg-gray-200 text-gray-500"
                            : isActive
                            ? "bg-linear-to-br from-yellow-500 to-orange-500 text-white animate-pulse"
                            : isDark
                            ? "bg-gray-700 text-gray-200 border border-gray-600"
                            : "bg-white text-gray-800 border border-gray-100"
                        }`}
                      >
                        {step.id}
                      </div>
                      <div>
                        <h3
                          className={`text-lg sm:text-xl font-semibold transition-colors duration-300 ${
                            isCompleted
                              ? isDark
                                ? "text-gray-400"
                                : "text-gray-600"
                              : isDark
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`text-sm mt-1 transition-colors duration-300 ${
                            isCompleted
                              ? "text-gray-500"
                              : isActive
                              ? "text-yellow-400"
                              : isDark
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          {isActive
                            ? "Hozirgi bosqich"
                            : isCompleted
                            ? "Yakunlangan"
                            : "Kutilmoqda"}
                        </p>
                      </div>
                    </div>

                    <div>
                      {isCompleted && (
                        <span
                          className={`px-3 py-1 rounded-full text-sm transition-colors duration-300 ${
                            isDark
                              ? "bg-gray-800 text-gray-300"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          ✅ Tugallandi
                        </span>
                      )}
                      {isActive && (
                        <span
                          className={`px-3 py-1 rounded-full text-sm border transition-colors duration-300 ${
                            isDark
                              ? "bg-yellow-900/30 text-yellow-300 border-yellow-600"
                              : "bg-yellow-50 text-yellow-700 border-yellow-100"
                          }`}
                        >
                          Faol
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tasks */}
                  {step.tasks && step.tasks.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4
                        className={`font-medium transition-colors duration-300 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Tasks:
                      </h4>
                      <ul className="space-y-2">
                        {step.tasks.map((task) => (
                          <li key={task.id} className="flex items-start gap-3">
                            <div
                              className={`shrink-0 w-5 h-5 mt-0.5 rounded border transition-colors duration-300 ${
                                task.completed
                                  ? isDark
                                    ? "bg-green-700 border-green-500"
                                    : "bg-green-50 border-green-200"
                                  : isDark
                                  ? "border-gray-600"
                                  : "border-gray-300"
                              }`}
                            >
                              {task.completed && (
                                <svg
                                  className="w-full h-full text-green-500"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <span
                              className={`text-sm transition-colors duration-300 ${
                                task.completed
                                  ? "line-through text-gray-500"
                                  : isActive
                                  ? "text-white"
                                  : isDark
                                  ? "text-gray-300"
                                  : "text-gray-600"
                              }`}
                            >
                              {task.task}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Result */}
                  {step.result && (
                    <p
                      className={`mt-4 font-medium transition-colors duration-300 ${
                        isCompleted
                          ? "text-gray-500"
                          : isActive
                          ? "text-yellow-300"
                          : isDark
                          ? "text-yellow-400"
                          : "text-blue-700"
                      }`}
                    >
                      {step.result}
                    </p>
                  )}

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${
                        isCompleted
                          ? "bg-gray-300"
                          : isActive
                          ? "bg-yellow-400 animate-pulse"
                          : "bg-gray-200"
                      }`}
                      style={{
                        width: isCompleted || !isActive ? "100%" : "72%",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
