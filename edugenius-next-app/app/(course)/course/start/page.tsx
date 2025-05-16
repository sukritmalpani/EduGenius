"use client";

import { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseChapters, CourseList } from "@/db/schema/chapter";
import type {
  CourseType,
  ChapterType,
  ChapterContentType,
} from "@/types/resume.type";
import { and, eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";

type CourseStartProps = { params: { courseId: string } };

const CourseStart = ({ params }: CourseStartProps) => {
  const [course, setCourse] = useState<CourseType | null>(null);
  const [chapters, setChapters] = useState<ChapterType[]>([]);
  const [content, setContent] = useState<ChapterContentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const [c] = await db
          .select()
          .from(CourseList)
          .where(eq(CourseList.courseId, params.courseId));
        setCourse(c as CourseType);

        const ch = await db
          .select()
          .from(CourseChapters)
          .where(eq(CourseChapters.courseId, params.courseId));
        setChapters(ch as ChapterType[]);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, [params]);

  const loadContent = async (chapterId: number) => {
    const [c] = await db
      .select()
      .from(CourseChapters)
      .where(
        and(
          eq(CourseChapters.courseId, params.courseId),
          eq(CourseChapters.chapterId, chapterId)
        )
      );
    setContent(c as ChapterContentType);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="p-4">
        <Skeleton className="h-6 w-1/3 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
      </div>
    );
  }

  if (!course) {
    return <p className="text-red-500">Course not found</p>;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "block" : "hidden"} w-64 bg-gray-100 p-2`}
      >
        <Button onClick={() => setSidebarOpen(false)}>Close</Button>
        {chapters.map((ch) => (
          <ChapterListCard
            key={ch.chapterId}
            chapter={ch}
            onClick={() => loadContent(ch.chapterId)}
          />
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 p-4">
        <Button onClick={() => setSidebarOpen(true)}>Chapters</Button>
        <h1 className="text-2xl mb-4">{course.courseOutput.topic}</h1>
        {content ? (
          <ChapterContent content={content} />
        ) : (
          <p>Select a chapter to get started.</p>
        )}
      </div>
    </div>
  );
};

export default CourseStart;
