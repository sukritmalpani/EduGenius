"use client";

import type { CourseType } from "@/types/resume.type";
import { motion } from "framer-motion";

type CourseDetailProps = {
  courseDetail: CourseType | null;
};

const CourseDetail = ({ courseDetail }: CourseDetailProps) => {
  if (!courseDetail) return null;

  const details = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
      label: "Skill Level",
      value: courseDetail?.level,
      color:
        "bg-[#007BFF]/20 text-[#007BFF] border-[#007BFF]/40 dark:bg-[#007BFF]/30 dark:text-[#80CFFF]",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      label: "Duration",
      value: courseDetail?.courseOutput.duration,
      color:
        "bg-[#FFB400]/20 text-[#FFB400] border-[#FFB400]/40 dark:bg-[#FFB400]/30 dark:text-[#FFD580]",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
          <path d="M8 7h6" />
          <path d="M8 11h8" />
          <path d="M8 15h6" />
        </svg>
      ),
      label: "Chapters",
      value: courseDetail?.courseOutput.chapters.length,
      color:
        "bg-[#28C76F]/20 text-[#28C76F] border-[#28C76F]/40 dark:bg-[#28C76F]/30 dark:text-[#7DFFA0]",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      ),
      label: "Video Included",
      value: courseDetail?.isVideo ? "Yes" : "No",
      color:
        "bg-[#A855F7]/20 text-[#A855F7] border-[#A855F7]/40 dark:bg-[#A855F7]/30 dark:text-[#D0A3FF]",
    },
  ];

  return (
    <div className="p-6 bg-[#1A1A2E] rounded-xl shadow-lg border border-[#2C3E50]">
      <h3 className="text-lg font-semibold mb-4 text-[#00FFFF]">
        Course Details
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {details.map((detail, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex flex-col items-center p-4 rounded-lg border ${detail.color} hover:scale-105 transition-transform duration-300 shadow-md`}
          >
            <div
              className={`p-3 rounded-full ${detail.color} bg-opacity-30 dark:bg-opacity-40`}
            >
              {detail.icon}
            </div>
            <span className="text-xs font-medium text-[#A1A1C1] mt-2">
              {detail.label}
            </span>
            <span className="font-bold text-white">{detail.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;
