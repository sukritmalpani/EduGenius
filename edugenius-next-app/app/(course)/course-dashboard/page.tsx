"use client";

import AddCourse from "./_components/AddCourse";
import ExplorePage from "./_components/ExplorePage";
import UserCourseList from "./_components/UserCourseList";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <div className="space-y-16 bg-[#1A1A2E] min-h-screen p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#00FFFF] bg-clip-text text-transparent mb-4">
          Course Dashboard
        </h1>
        <p className="text-[#A1A1C1] text-xl">
          Create, manage, and explore AI-generated courses
        </p>
      </motion.div>

      <AddCourse />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#8A2BE2]/20 p-2 rounded-lg">
            <BookOpen className="h-6 w-6 text-[#8A2BE2]" />
          </div>
          <h2 className="text-2xl font-bold text-[#00FFFF]">Your Courses</h2>
        </div>
        <UserCourseList />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="py-6"
      >
        <ExplorePage />
      </motion.div>
    </div>
  );
};

export default Page;