"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const backgrounds = [
  "/image.png"
];

export default function AnimatedBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % backgrounds.length;
    const img = new Image();
    img.src = backgrounds[nextIndex];

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-black">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={backgrounds[currentIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "linear" }}
          className="absolute inset-0 w-full h-full object-cover object-center saturate-125 contrast-110"
          alt="Anime AI Background"
          style={{ willChange: "opacity" }} 
        />
      </AnimatePresence>
      
    </div>
  );
}