"use client";

import type { CourseType } from "@/types/resume.type";
import EditChapters from "./_edit/EditChapters.tsx";
import { motion } from "framer-motion";

type ChapterListProps = {
  course: CourseType | null;
  onRefresh: (refresh: boolean) => void;
  edit?: boolean;
};

const ChapterList = ({ course, onRefresh, edit = true }: ChapterListProps) => {
  if (!course || course.courseOutput.chapters.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center p-4 bg-[#2C3E50] rounded-full mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[#A1A1C1]"
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
        </div>
        <h3 className="text-lg font-medium text-[#A1A1C1] mb-2">
          No chapters available
        </h3>
        <p className="text-[#A1A1C1]">
          There are no chapters in this course yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold p-4 text-[#00FFFF] flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-[#8A2BE2]"
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
        Course Chapters
      </h3>

      <div className="space-y-4">
        {course?.courseOutput.chapters.map((chapter, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-[#2C3E50] rounded-lg bg-[#1A1A2E] hover:shadow-md hover:border-[#00FFFF] transition-shadow duration-300"
          >
            <div className="flex items-start p-4 md:p-5">
              <div className="flex-shrink-0 mr-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#8A2BE2] text-[#00FFFF] font-semibold shadow-lg">
                  {index + 1}
                </div>
              </div>

              <div className="flex-grow">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-lg text-[#00FFFF]">
                    {chapter?.chapter_name}
                  </h4>

                  {edit && (
                    <EditChapters
                      course={course}
                      index={index}
                      onRefresh={() => onRefresh(true)}
                    />
                  )}
                </div>

                <p className="mt-1 text-sm text-[#A1A1C1]">
                  {chapter.description}
                </p>

                <div className="mt-2 flex items-center text-sm text-[#8A2BE2]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
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
                  {chapter.duration}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
