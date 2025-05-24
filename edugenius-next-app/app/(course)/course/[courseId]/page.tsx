"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/configs/db";
import { CourseList } from "@/db/schema/chapter";
import type { CourseType } from "@/types/resume.type";
import { eq } from "drizzle-orm";
import ChapterList from "../../create-course/[courseId]/_components/ChapterList";
import CourseDetail from "../../create-course/[courseId]/_components/CourseDetail";
import CourseBasicInfo from "../../create-course/[courseId]/_components/CourseBasicInfo";
import Header from "../../course-dashboard/_components/Header";

type CourseParams = {
  params: {
    courseId: string;
  };
};

const Course = ({ params }: CourseParams) => {
  const [course, setCourse] = useState<CourseType | null>(null);

  const getCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.courseId, params.courseId));
    setCourse(result[0] as CourseType);
  };

  useEffect(() => {
    if (params) {
      getCourse();
    }
  }, [params]);

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#1A1A2E]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#00FFFF]"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-[#1A1A2E] border border-[#2C3E50] rounded-lg shadow-lg overflow-hidden mb-8"
        >
          <CourseBasicInfo
            courseInfo={course}
            onRefresh={() => getCourse()}
            edit={false}
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-[#1A1A2E] border border-[#2C3E50] rounded-lg shadow-lg overflow-hidden mb-8"
        >
          <CourseDetail courseDetail={course} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-[#1A1A2E] border border-[#2C3E50] rounded-lg shadow-lg overflow-hidden"
        >
          <ChapterList
            course={course}
            onRefresh={() => getCourse()}
            edit={false}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Course;
