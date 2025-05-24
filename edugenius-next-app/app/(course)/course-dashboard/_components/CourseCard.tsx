"use client";

import type { CourseType } from "@/types/resume.type";
import Image from "next/image";
import { BookOpen, Clock } from "lucide-react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import DropDownOptions from "./DropDownOptions";
import { db } from "@/configs/db";
import { CourseList } from "@/db/schema/chapter";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type CourseCardProps = {
  course: CourseType;
  onRefresh: () => void;
  displayUser?: boolean;
};

const CourseCard = ({ course, onRefresh, displayUser = false }: CourseCardProps) => {
  const handleOnDelete = async () => {
    const res = await db
      .delete(CourseList)
      .where(eq(CourseList.id, course.id))
      .returning({
        id: CourseList.id,
        courseName: CourseList.courseName,
      });

    if (res) {
      onRefresh();
    }
  };

  const progress = course.progress || 0;

  return (
    <div className="group overflow-hidden rounded-xl border bg-[#1A1A2E] shadow-lg flex flex-col h-full">
      <div className="relative">
        <Link href={`/course/${course.courseId}`}>
          <Image
            src={course.courseBanner || "/thumbnail.png"}
            alt={course?.courseName ?? "AI Course Generator"}
            width={400}
            height={225}
            priority
            className="w-full h-[180px] object-cover transition-transform duration-500 rounded-t-xl"
          />
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-[#8A2BE2] text-white">{course.level || "Beginner"}</Badge>
          </div>
          {progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 px-4 py-2">
              <div className="flex justify-between text-xs text-white mb-1">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-1.5 bg-[#2C3E50]" />
            </div>
          )}
        </Link>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-xl text-[#00FFFF] line-clamp-1">
            {course.courseOutput.topic}
          </h2>
          {!displayUser && (
            <DropDownOptions handleDeleteCourse={handleOnDelete}>
              <HiOutlineDotsVertical
                size={24}
                className="text-gray-400 hover:text-[#00FFFF]"
              />
            </DropDownOptions>
          )}
        </div>
        <p className="text-sm text-[#A1A1C1] mb-4 line-clamp-2">
          {course.category || "Educational Course"}
        </p>
        <div className="flex gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-[#A1A1C1] bg-[#2C2C5A] rounded-full px-3 py-1.5">
            <BookOpen className="h-3.5 w-3.5 text-[#007BFF]" />
            <span>{course?.courseOutput?.chapters?.length || 0} Chapters</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#A1A1C1] bg-[#2C2C5A] rounded-full px-3 py-1.5">
            <Clock className="h-3.5 w-3.5 text-[#00FFFF]" />
            <span>{course.duration || "Self-paced"}</span>
          </div>
        </div>
        {displayUser && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#2C3E50]">
            <Image
              src={course.userprofileimage || "/userProfile.png"}
              alt={course.username || "AI Course Generator"}
              width={28}
              height={28}
              className="rounded-full border border-[#8A2BE2]"
            />
            <span className="text-sm text-[#A1A1C1] truncate">
              {course.username || "AI Course Generator"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
