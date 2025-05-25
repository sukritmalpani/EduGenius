"use client";
import "regenerator-runtime/runtime";
import { useState } from "react";
import { UserInputContext } from "../_context/UserInputContext";
import { UserCourseListContext } from "../_context/UserCourseList.context";
import type { CourseType, UserInputType } from "@/types/resume.type";

const CreateCourseLayout = ({ children }: { children: React.ReactNode }) => {
  const [userInput, setUserInput] = useState<UserInputType>({});
  const [userCourseList, setUserCourseList] = useState<CourseType[]>([]);

  return (
    <UserInputContext.Provider value={{ userInput, setUserInput }}>
      <UserCourseListContext.Provider
        value={{ userCourseList, setUserCourseList }}
      >
        <div className="min-h-screen bg-gradient-to-br from-[#141E30] to-[#243B55] text-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
            {children}
          </div>
        </div>
      </UserCourseListContext.Provider>
    </UserInputContext.Provider>
  );
};

export default CreateCourseLayout;
