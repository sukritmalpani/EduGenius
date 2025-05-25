"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";

const ExplorePage = () => {
  const dummyCourses = Array.from({ length: 9 }, (_, i) => ({
    courseId: `${i}`,
    title: `Course ${i + 1}`,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-4 bg-[#1A1A2E] text-[#A1A1C1] rounded-xl"
    >
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center text-[#00FFFF] mb-2">
              <span className="bg-[#8A2BE2]/20 p-2 rounded-lg mr-3">
                <Compass className="h-6 w-6 text-[#8A2BE2]" />
              </span>
              Explore More Courses
            </h2>
            <p className="text-[#A1A1C1] text-lg">
              Discover AI-generated courses created by the community
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {dummyCourses.map((course) => (
            <div key={course.courseId} className="p-6 bg-[#2D2D44] rounded-lg">
              <h4 className="text-white font-semibold">{course.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ExplorePage;
