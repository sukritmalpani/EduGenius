"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export function RoboAnimation() {
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          {/* Glowing Effect */}
          <motion.div
            className="absolute -inset-4 bg-[#00FFFF]/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          {/* Lightbulb Icon with AI Glow */}
          <Lightbulb className="w-32 h-32 text-[#8A2BE2] drop-shadow-lg" />
        </div>
      </motion.div>
    </div>
  );
}
