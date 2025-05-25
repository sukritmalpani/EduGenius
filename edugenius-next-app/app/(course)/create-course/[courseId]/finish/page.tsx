"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoCopyOutline } from "react-icons/io5";
import { db } from "@/configs/db";
import { CourseList } from "@/db/schema/chapter";
import { and, eq } from "drizzle-orm";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import type { CourseType } from "@/types/resume.type";
import { BaseEnvironment } from "@/configs/BaseEnvironment";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

type ParamsType = {
  courseId: string;
};

const FinishScreen = ({ params }: { params: ParamsType }) => {
  const { user } = useKindeBrowserClient();
  const [course, setCourse] = useState<CourseType | null>(null);
  const router = useRouter();
  const { HOST_URL } = new BaseEnvironment();
  const COURSE_LINK = `${HOST_URL}/course/${course?.courseId}/start`;

  useEffect(() => {
    if (params && user) {
      getCourse();
    }
  }, [params, user]);

  const getCourse = async () => {
    const res = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params.courseId),
          eq(CourseList.createdBy, user?.email ?? "")
        )
      );
    setCourse(res[0] as CourseType);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(COURSE_LINK);
      toast({
        title: "Copied to clipboard",
        description: "The course link has been copied to your clipboard.",
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast({
        title: "Failed to copy",
        description: "There was an error copying the link. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold text-center text-[#00FFFF] mb-8">
        🎉 Congratulations! Your course is ready
      </h1>

      <div className="bg-[#1A1A2E] rounded-lg shadow-lg p-6 mb-8 border border-[#2C3E50]">
        <CourseBasicInfo
          courseInfo={course}
          onRefresh={() => getCourse()}
          edit={false}
        />
      </div>

      <div className="bg-[#1A1A2E] rounded-lg shadow-lg p-6 border border-[#2C3E50]">
        <h2 className="text-xl font-semibold text-[#00FFFF] mb-4">
          Course URL
        </h2>
        <div className="flex items-center justify-between bg-[#2C3E50] rounded p-3">
          <Link
            href={COURSE_LINK}
            className="text-[#8A2BE2] hover:text-[#00FFFF] hover:underline truncate"
          >
            {COURSE_LINK}
          </Link>
          <Button
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
            className="ml-2 border-[#8A2BE2] hover:border-[#00FFFF]"
          >
            <IoCopyOutline className="h-4 w-4 text-[#00FFFF]" />
            <span className="sr-only">Copy link</span>
          </Button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={() => router.push("/course-dashboard")}
          className="bg-[#007BFF] hover:bg-[#0056b3] text-white"
        >
          Return to Dashboard
        </Button>
      </div>
    </motion.div>
  );
};

export default FinishScreen;
