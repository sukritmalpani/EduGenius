import type { CourseType } from "@/types/resume.type";
import Image from "next/image";
import { BookOpen, Clock, Star, Users } from "lucide-react";
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

const CourseCard = ({
  course,
  onRefresh,
  displayUser = false,
}: CourseCardProps) => {
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

  // Calculate progress percentage
  const progress = course.progress || 0;

  return (
    <div className="group overflow-hidden rounded-xl border border-[#8A2BE2]/40 bg-[#1A1A2E] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      <div className="relative">
        <Link href={`/course/${course.courseId}`}>
          <div className="overflow-hidden">
            <Image
              src={course.courseBanner || "/thumbnail.png"}
              alt={course?.courseName ?? "AI Course Generator"}
              width={400}
              height={225}
              priority
              className="w-full h-[180px] object-cover transform group-hover:scale-105 transition-transform duration-500 rounded-t-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] to-transparent opacity-60"></div>
          </div>
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-[#8A2BE2] hover:bg-[#6A0DAD] text-white font-medium px-2.5 py-1 rounded-md">
              {course.level || "Beginner"}
            </Badge>
          </div>
          {progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 px-4 py-2">
              <div className="flex justify-between items-center text-xs text-white mb-1">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-1.5 bg-[#2C3E50]" />
            </div>
          )}
        </Link>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-xl line-clamp-1 text-[#00FFFF] group-hover:text-[#00FFFF] transition-colors">
            {course.courseOutput.topic}
          </h2>
          {!displayUser && (
            <DropDownOptions handleDeleteCourse={() => handleOnDelete()}>
              <HiOutlineDotsVertical
                size={24}
                className="text-gray-400 hover:text-[#00FFFF] transition-colors"
              />
            </DropDownOptions>
          )}
        </div>

        <p className="text-sm text-[#A1A1C1] mb-4 line-clamp-2 flex-grow">
          {course.category || "Educational Course"}
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#A1A1C1] bg-[#2C2C5A] rounded-full px-3 py-1.5">
            <BookOpen className="h-3.5 w-3.5 text-[#007BFF]" />
            <span>{course?.courseOutput?.chapters?.length || 0} Chapters</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-[#A1A1C1] bg-[#2C2C5A] rounded-full px-3 py-1.5">
            <Clock className="h-3.5 w-3.5 text-[#00FFFF]" />
            <span>{course.duration || "Self-paced"}</span>
          </div>
        </div>

        {displayUser && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#2C3E50]">
            <Image
              src={course?.userprofileimage || "/userProfile.png"}
              alt={course?.username || "AI Course Generator"}
              width={28}
              height={28}
              priority
              className="rounded-full border border-[#8A2BE2]"
            />
            <span className="text-sm text-[#A1A1C1] truncate">
              {course?.username || "AI Course Generator"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;