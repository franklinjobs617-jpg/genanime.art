"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed right-6 bottom-24 z-40 
        w-12 h-12 rounded-full 
        bg-white border border-slate-200 text-slate-700 
        shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-slate-300
        flex items-center justify-center 
        transition-all duration-300 ease-out
        ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-50 pointer-events-none"
        }
      `}
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </button>
  );
}
