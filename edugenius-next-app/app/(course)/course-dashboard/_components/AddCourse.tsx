"use client";
import { UserCourseListContext } from "@/app/(course)/_context/UserCourseList.context";
import { Button } from "@/components/ui/button";
import { useState, useContext } from "react";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const AddCourse = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { userCourseList } = useContext(UserCourseListContext);

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-dashed border-[#8A2BE2] bg-[#1A1A2E] p-8 transition-all duration-300 hover:border-[#00FFFF] shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div
          className={`mb-4 rounded-full bg-[#8A2BE2]/20 p-3 text-[#8A2BE2] transition-transform duration-300 ${
            isHovered ? "scale-110" : ""
          }`}
        >
          <PlusCircle className="h-8 w-8" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-[#00FFFF]">
          Create New Course
        </h3>
        <p className="mb-6 max-w-md text-[#A1A1C1]">
          Generate a new AI-powered course in minutes. Just provide a topic and
          our AI will do the rest.
        </p>
        <Link href={"/create-course"}>
          <Button
            className="bg-gradient-to-r from-[#8A2BE2] to-[#007BFF] hover:from-[#6A0DAD] hover:to-[#0056b3] text-white transition-all duration-300"
            size="lg"
          >
            Start Creating
          </Button>
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-[#00FFFF]/10 opacity-50 blur-xl"></div>
      <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-[#8A2BE2]/10 opacity-50 blur-xl"></div>
    </div>
  );
};

export default AddCourse;