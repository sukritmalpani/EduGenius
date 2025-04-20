"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";
import { FloatingPaper } from "./floating-paper";
import { RoboAnimation } from "./robo-animation";

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center bg-[#1A1A2E]">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Learn Smarter with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] to-[#00FFFF]">
                {" "}
                AI Education
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#A1A1C1] text-xl mb-8 max-w-2xl mx-auto"
          >
            Personalized learning experiences powered by AI. Master any subject
            with adaptive courses, instant feedback, and 24/7 AI tutoring.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-[#007BFF] hover:bg-[#0056b3] text-white px-8 shadow-lg transition-all"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Explore Courses
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-[#8A2BE2] hover:bg-[#8A2BE2]/20 transition-all"
            >
              <Sparkles className="mr-2 h-5 w-5 text-[#8A2BE2]" />
              Try AI Tutor
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Animated robot */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <RoboAnimation />
      </div>
    </div>
  );
}
