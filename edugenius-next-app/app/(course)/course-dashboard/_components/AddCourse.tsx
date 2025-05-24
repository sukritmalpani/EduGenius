"use client";
import { useState } from "react";

const AddCourse = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-dashed p-8 transition-all duration-300 shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <h3 className="mb-2 text-xl font-semibold">Create New Course</h3>
        <p className="mb-6 max-w-md text-gray-500">
          Generate a new AI-powered course in minutes.
        </p>
      </div>
    </div>
  );
};

export default AddCourse;
