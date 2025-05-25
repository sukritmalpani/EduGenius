"use client";

import { db } from "@/configs/db";
import { CourseList } from "@/db/schema/chapter";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { and, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { generateCourseContent } from "./_utils/generateCourseContent";
import LoadingDialog from "../_components/LoadingDialog";
import { useRouter } from "next/navigation";
import type { CourseType } from "@/types/resume.type";

export type ParamsType = {
  courseId: string;
};

const CoursePageLayout = ({ params }: { params: ParamsType }) => {
  const { user } = useKindeBrowserClient();
  const [course, setCourse] = useState<CourseType | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (user?.email) {
      getCourse();
    }
  }, [user, params, refreshKey]); // Refreshes course when user changes or refresh is triggered

  const getCourse = async () => {
    if (!user?.email) return;

    try {
      const res = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params.courseId),
            eq(CourseList.createdBy, user.email)
          )
        );

      if (res.length === 0) {
        console.error("Course not found.");
        return;
      }

      setCourse(res[0] as CourseType);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const handleGenerateCourseContent = async () => {
    try {
      setLoading(true);
      await generateCourseContent(course, setLoading);
      await db
        .update(CourseList)
        .set({ isPublished: true })
        .where(eq(CourseList.courseId, params.courseId));
      router.replace(`/create-course/${params.courseId}/finish`);
    } catch (error) {
      console.error("Error generating course content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Course Layout
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Review and customize your course structure before generating content.
        </p>
      </div>

      <LoadingDialog loading={loading} />

      {course ? (
        <div className="space-y-8">
          {/* Basic Info */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <CourseBasicInfo
              courseInfo={course}
              onRefresh={() => setRefreshKey((prev) => prev + 1)}
            />
          </div>

          {/* Course Details */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <CourseDetail courseDetail={course} />
          </div>

          {/* List Of Lessons */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
            <ChapterList
              course={course}
              onRefresh={() => setRefreshKey((prev) => prev + 1)}
            />
          </div>

          {/* Generate Content Button */}
          <div className="mt-10 flex justify-center">
            <Button
              onClick={handleGenerateCourseContent}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              disabled={loading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              Generate Course Content
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-64 mb-4"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-40"></div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-4">
            Loading course details...
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursePageLayout;
