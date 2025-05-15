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

  useEffect(() => {
    const fetchCourse = async () => {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, params.courseId));
      setCourse(result[0] as CourseType);
    };
    fetchCourse();
  }, [params]);

  return (
    <div className="p-8">
      {course ? (
        <>
          <h1 className="text-2xl font-bold">{course.courseOutput.topic}</h1>
          <p>{course.courseName}</p>
        </>
      ) : (
        <p>Loading course…</p>
      )}
    </div>
  );
};

export default Course;
