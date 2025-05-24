"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import EditCourseBasicInfo from "./_edit/EditCourseBasicInfo";
import { Input } from "@/components/ui/input";
import { uploadFilesToFirebase } from "../_utils/uploadFilesToFirebase";
import { useEffect, useState } from "react";
import type { CourseType } from "@/types/resume.type";
import Link from "next/link";

type CourseBasicInfoProps = {
  courseInfo: CourseType | null;
  onRefresh: (refresh: boolean) => void;
  edit?: boolean;
};

const CourseBasicInfo = ({
  courseInfo,
  onRefresh,
  edit = true,
}: CourseBasicInfoProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(
    null
  );
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setSelectedImage(courseInfo?.courseBanner);
  }, [courseInfo]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0) as Blob;
    setSelectedImage(URL.createObjectURL(file));
    uploadFilesToFirebase(file, courseInfo!);
  };

  return (
    <div className="p-6 bg-[#1A1A2E] rounded-xl shadow-md border border-[#2C3E50]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Course Info Section */}
        <div className="flex flex-col justify-center">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h2 className="font-bold text-2xl md:text-3xl text-[#00FFFF] leading-tight">
                {courseInfo?.courseOutput.topic}
              </h2>

              {edit && (
                <EditCourseBasicInfo
                  courseInfo={courseInfo}
                  onRefresh={() => onRefresh(true)}
                />
              )}
            </div>

            {/* Course Category Label */}
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#8A2BE2] text-white shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 mr-1"
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
                {courseInfo?.category}
              </span>
            </div>

            {/* Course Description */}
            <p className="text-[#A1A1C1] text-sm md:text-base leading-relaxed">
              {courseInfo?.courseOutput.description}
            </p>

            {/* Start Learning Button */}
            {!edit && (
              <Link href={`/course/${courseInfo?.courseId}/start`}>
                <Button className="mt-4 w-full bg-gradient-to-r from-[#8A2BE2] to-[#007BFF] hover:from-[#6A1B9A] hover:to-[#0056b3] text-white shadow-lg">
                  Start Learning
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Course Thumbnail Upload Section */}
        <div>
          <div
            className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
              edit
                ? "border-dashed border-[#2C3E50] hover:border-[#00FFFF]"
                : "border-[#2C3E50]"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="aspect-video relative">
              <img
                src={selectedImage ? selectedImage : "/thumbnail.png"}
                alt="Course thumbnail"
                className="w-full h-full object-cover rounded-lg"
              />

              {/* Hover Overlay for Image Upload */}
              {edit && isHovered && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300">
                  <div className="text-white text-center p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mx-auto mb-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                    <p className="text-sm">Click to change thumbnail</p>
                  </div>
                </div>
              )}
            </div>

            {/* File Input for Image Upload */}
            {edit && (
              <Input
                type="file"
                accept="image/*"
                id="image-upload"
                className="hidden"
                onChange={handleImageUpload}
              />
            )}
          </div>

          {/* Upload Instructions */}
          {edit && (
            <label
              htmlFor="image-upload"
              className="mt-2 text-xs text-[#A1A1C1] block text-center cursor-pointer"
            >
              Recommended size: **1280×720px**
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
