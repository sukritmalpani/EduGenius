"use client";

import { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/db/schema/chapter";
import type { CourseType } from "@/types/resume.type";
import { eq } from "drizzle-orm";

import Header from "../../course-dashboard/_components/Header";
import CourseBasicInfo from "../../create-course/[courseId]/_components/CourseBasicInfo";
import CourseDetail from "../../create-course/[courseId]/_components/CourseDetail";
import ChapterList from "../../create-course/[courseId]/_components/ChapterList";

type CourseParams = {
  params: {
    courseId: string;
  };
};

const Course = ({ params }: CourseParams) => {
  const [course, setCourse] = useState<CourseType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCourse = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, params.courseId));
      setCourse(result[0] as CourseType);
      setError(null);
    } catch {
      setError("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourse();
  }, [params]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#1A1A2E]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#00FFFF]" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="p-8 text-center text-red-500">
        {error || "Course not found"}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Header title={course.courseOutput.topic} />
      <div className="space-y-6">
        <CourseBasicInfo
          courseInfo={course}
          onRefresh={getCourse}
          edit={false}
        />
        <CourseDetail courseDetail={course} />
        <ChapterList course={course} onRefresh={getCourse} edit={false} />
      </div>
    </div>
  );
};

export default Course;
