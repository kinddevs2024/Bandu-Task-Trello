"use client";

import Image from "next/image";
import banduImg from "../../public/welcome.png";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function WelcomeSection() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [imgOffset, setImgOffset] = useState(-100); // initial slide from left

  useEffect(() => setMounted(true));

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setImgOffset(0), 100); // animate image to center on load
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <section
      className={`relative overflow-hidden flex items-center justify-center min-h-screen w-full transition-colors duration-300 ${
        isDark ? "bg-black" : "bg-gray-100"
      }`}
    >
      {/* Main background blur */}
      <span
        className={`absolute -top-52 -left-52 w-[600px] h-[600px] rounded-full blur-[60px] -z-10 transition-colors duration-300 ${
          isDark ? "bg-yellow-600/40" : "bg-yellow-300/30"
        }`}
        style={{
          transform: `translateX(${scrollY * 0.1}px)`,
        }}
      ></span>

      <div
        className={`relative z-10 flex flex-col-reverse md:flex-row items-center max-w-6xl justify-center px-4 md:px-8 lg:px-16 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Text */}
        <div className="w-full md:w-2xl text-center md:text-left md:mt-0">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-medium mb-4 md:mb-0 md:mr-6 leading-[1.3] transition-colors duration-300 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Banduga{" "}
            <span className="interactive-gradient relative inline-block">
              Xush
              <style jsx>{`
                .interactive-gradient {
                  background-image: linear-gradient(
                    90deg,
                    #ffd54a,
                    #ff702d,
                    #000000
                  );
                  background-size: 200% 200%;
                  -webkit-background-clip: text;
                  background-clip: text;
                  color: transparent;
                  animation: hueShift 8s linear infinite;
                  transition: transform 0.12s ease;
                }

                @keyframes hueShift {
                  0% {
                    background-position: 0% 50%;
                  }
                  50% {
                    background-position: 100% 50%;
                  }
                  100% {
                    background-position: 0% 50%;
                  }
                }
              `}</style>
            </span>
            <br /> Kelibsiz
          </h1>

          <p
            className={`mt-2 text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed mx-auto md:mx-0 transition-colors duration-300 ${
              isDark ? "text-gray-300" : "text-gray-800"
            }`}
            style={{
              fontFamily: "var(--font-open-sans)",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            Bandu startap rivojlanish yo'l xaritasi — foydalanuvchi uchun qulay,
            tezkor va samarali xizmatlarni birlashtiruvchi tizim.
          </p>
        </div>

        {/* Image with scroll + entrance animation */}
        <div className="relative flex items-center justify-center mb-6 md:mb-0">
          {/* Blur behind image */}
          <span
            className={`absolute inset-0 rounded-full blur-2xl scale-90 rounded-tl-full rounded-tr-lg rounded-bl-lg -z-10 transition-all duration-500 ${
              isDark ? "bg-yellow-600/40" : "bg-yellow-300/30"
            }`}
            style={{
              transform: `translateX(${scrollY * 0.15 + imgOffset}px)`,
            }}
          ></span>

          <Image
            src={banduImg}
            alt="Bandu Logo"
            width={420}
            height={420}
            className="w-[280px] md:w-[340px] lg:w-[420px] h-auto transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(${scrollY * 0.2 + imgOffset}px)`,
            }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
