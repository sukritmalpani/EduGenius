"use client";

import { UserInputContext } from "@/app/(course)/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { UserInputType } from "@/types/resume.type";
import { useContext } from "react";
import { motion } from "framer-motion";

const TopicDesc = () => {
  const { userInput, setUserInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName: keyof UserInputType, value: string) => {
    setUserInput((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-6 text-[#00FFFF]">
        Define your course topic and description
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="topic"
            className="block text-sm font-medium text-[#A1A1C1]"
          >
            Course Topic
          </label>
          <div className="relative">
            <Input
              id="topic"
              placeholder="Enter the main topic of your course"
              defaultValue={userInput?.topic}
              onChange={(e) => handleInputChange("topic", e.target.value)}
              className="pl-10 bg-[#1A1A2E] border-[#8A2BE2] text-[#A1A1C1] shadow-md focus:border-[#00FFFF] focus:ring-[#00FFFF]"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#8A2BE2]"
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
            </div>
          </div>
          <p className="text-xs text-[#A1A1C1] mt-1">
            Choose a clear, specific topic that describes what learners will
            gain
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-[#A1A1C1]"
          >
            Course Description
          </label>
          <div className="relative">
            <Textarea
              id="description"
              placeholder="Describe what your course will cover and what learners will achieve"
              defaultValue={userInput?.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="pl-10 min-h-[150px] bg-[#1A1A2E] border-[#8A2BE2] text-[#A1A1C1] shadow-md focus:border-[#00FFFF] focus:ring-[#00FFFF]"
            />
            <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#8A2BE2]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                <line x1="9" y1="9" x2="10" y2="9" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="15" y2="17" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-[#A1A1C1] mt-1">
            Include key topics, learning outcomes, and any specific content you
            want to include
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicDesc;
