"use client";

import { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/db/schema/chapter";
import type { CourseType } from "@/types/resume.type";
import { eq } from "drizzle-orm";

type CourseStartProps = {
  params: { courseId: string };
};

const CourseStart = ({ params }: CourseStartProps) => {
  const [course, setCourse] = useState<CourseType | null>(null);

  useEffect(() => {
    const getCourse = async () => {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, params.courseId));
      setCourse(result[0] as CourseType);
    };
    getCourse();
  }, [params]);

  if (!course) return <p>Loading course...</p>;

  return (
    <div>
      <h1>{course.courseOutput.topic}</h1>
      <p>{course.courseName}</p>
    </div>
  );
};

export default CourseStart;
