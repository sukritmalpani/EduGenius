import type { CourseType } from "@/types/resume.type";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";

type CourseCardProps = {
  course: CourseType;
};

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div className="rounded-xl border bg-[#1A1A2E] shadow-lg flex flex-col h-full">
      <div className="relative">
        <Link href={`/course/${course.courseId}`}>
          <Image
            src={course.courseBanner || "/thumbnail.png"}
            alt={course?.courseName ?? "AI Course Generator"}
            width={400}
            height={225}
            className="w-full h-[180px] object-cover rounded-t-xl"
          />
        </Link>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <h2 className="font-bold text-xl text-[#00FFFF] mb-2 line-clamp-1">
          {course.courseOutput.topic}
        </h2>
        <p className="text-sm text-[#A1A1C1] mb-4 line-clamp-2">
          {course.category || "Educational Course"}
        </p>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs text-[#A1A1C1] bg-[#2C2C5A] rounded-full px-3 py-1.5">
            <BookOpen className="h-3.5 w-3.5 text-[#007BFF]" />
            <span>{course?.courseOutput?.chapters?.length || 0} Chapters</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#A1A1C1] bg-[#2C2C5A] rounded-full px-3 py-1.5">
            <Clock className="h-3.5 w-3.5 text-[#00FFFF]" />
            <span>{course?.duration || "Self-paced"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
