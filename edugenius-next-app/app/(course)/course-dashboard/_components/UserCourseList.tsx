"use client";

import { useContext, useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/db/schema/chapter";
import type { CourseType } from "@/types/resume.type";
import { eq } from "drizzle-orm";
import { UserCourseListContext } from "@/app/(course)/_context/UserCourseList.context";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

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

  return null; // UI to be implemented later
};

export default UserCourseList;
