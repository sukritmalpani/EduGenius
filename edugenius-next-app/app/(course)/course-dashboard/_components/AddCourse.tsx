"use client";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AddCourse = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-dashed p-8 transition-all duration-300 shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div
          className={`mb-4 rounded-full p-3 transition-transform duration-300 ${
            isHovered ? "scale-110" : ""
          }`}
        >
          <PlusCircle className="h-8 w-8" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">Create New Course</h3>
        <p className="mb-6 max-w-md text-gray-500">
          Generate a new AI-powered course in minutes. Just provide a topic and our AI will do the rest.
        </p>
        <Link href="/create-course">
          <Button className="text-white" size="lg">Start Creating</Button>
        </Link>
      </div>
    </div>
  );
};

export default AddCourse;
