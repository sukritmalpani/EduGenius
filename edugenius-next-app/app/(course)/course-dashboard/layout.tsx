"use client";
import "regenerator-runtime/runtime";
import type React from "react";

import { useState, useEffect } from "react";
import { UserCourseListContext } from "../_context/UserCourseList.context";
import type { CourseType } from "@/types/resume.type";
import { motion } from "framer-motion";

const CourseDashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [userCourseList, setUserCourseList] = useState<CourseType[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <UserCourseListContext.Provider
      value={{ userCourseList, setUserCourseList }}
    >
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2C3E50] min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[95%] lg:max-w-[90%] mx-auto px-4 md:px-8 lg:px-12 pt-8 pb-16"
        >
          <div className="rounded-xl bg-[#1A1A2E] shadow-xl border border-[#8A2BE2]/30 p-6 md:p-8">
            {children}
          </div>
        </motion.div>
      </div>
    </UserCourseListContext.Provider>
  );
};

export default CourseDashboardLayout;