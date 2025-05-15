"use client";

import { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/db/schema/chapter";
import type { CourseType } from "@/types/resume.type";
import { eq } from "drizzle-orm";

type CourseParams = {
  params: {
    courseId: string;
  };
};

const Course = ({ params }: CourseParams) => {
  const [course, setCourse] = useState<CourseType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const result = await db
          .select()
          .from(CourseList)
          .where(eq(CourseList.courseId, params.courseId));
        setCourse(result[0] as CourseType);
      } catch (err) {
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
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
    <div className="p-8">
      <h1 className="text-3xl font-bold">{course.courseOutput.topic}</h1>
      <p className="mt-2 text-gray-400">{course.courseName}</p>
    </div>
  );
};

export default Course;
