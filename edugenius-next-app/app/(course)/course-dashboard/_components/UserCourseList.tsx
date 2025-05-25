"use client";

import { useContext, useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/db/schema/chapter";
import type { CourseType } from "@/types/resume.type";
import { eq } from "drizzle-orm";
import { UserCourseListContext } from "@/app/(course)/_context/UserCourseList.context";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SkeletonLoading from "./SkeletonLoading";
import { BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const UserCourseList = () => {
  const { user } = useKindeBrowserClient();
  const [courses, setCourses] = useState<CourseType[] | null>(null);
  const { setUserCourseList } = useContext(UserCourseListContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getUserCourses();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const getUserCourses = async () => {
    setIsLoading(true);
    try {
      const res = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.createdBy, user?.email ?? ""));
      setCourses(res as CourseType[]);
      setUserCourseList(res as CourseType[]);
    } catch (error) {
      console.error("Error fetching user courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SkeletonLoading items={3} />;
  }

  if (!courses || courses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-16 text-center bg-[#1A1A2E]/50 rounded-2xl border border-dashed border-[#8A2BE2]/30 shadow-inner"
      >
        <div className="bg-[#8A2BE2]/20 p-6 rounded-full mb-6">
          <BookOpen className="h-10 w-10 text-[#00FFFF]" />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-[#00FFFF]">No courses yet</h3>
        <p className="text-[#A1A1C1] max-w-md mb-8 text-lg">
          You haven't created any courses yet. Get started by creating your
          first AI-generated course.
        </p>
        <Link href="/create-course">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#8A2BE2] to-[#007BFF] hover:from-[#6A0DAD] hover:to-[#0056b3] text-white font-medium px-6 py-6 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
            Create Your First Course
          </Button>
        </Link>
      </motion.div>
    );
  }

  return null; // Will be replaced in next commit
};

export default UserCourseList;
