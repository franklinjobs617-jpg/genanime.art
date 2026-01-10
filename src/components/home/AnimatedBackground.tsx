"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const backgrounds = [
  "/image.png"
];

export default function AnimatedBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-black">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "linear" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={backgrounds[currentIndex]}
            alt="Anime AI Background"
            fill
            className="object-cover object-center saturate-125 contrast-110"
            priority={true}
            quality={90}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

    </div>
  );
}