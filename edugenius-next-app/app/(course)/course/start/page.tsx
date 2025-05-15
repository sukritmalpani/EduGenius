"use client";

import { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseChapters, CourseList } from "@/db/schema/chapter";
import type { CourseType, ChapterType, ChapterContentType } from "@/types/resume.type";
import { and, eq } from "drizzle-orm";

type CourseStartProps = {
  params: { courseId: string };
};

const CourseStart = ({ params }: CourseStartProps) => {
  const [course, setCourse] = useState<CourseType | null>(null);
  const [chapters, setChapters] = useState<ChapterType[]>([]);
  const [content, setContent] = useState<ChapterContentType | null>(null);

  useEffect(() => {
    async function load() {
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
    }
    load();
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
  };

  if (!course) return <p>Loading course...</p>;

  return (
    <div>
      <h1>{course.courseOutput.topic}</h1>
      <ul>
        {chapters.map((ch) => (
          <li key={ch.chapterId}>
            <button onClick={() => loadContent(ch.chapterId)}>
              {ch.chapter_name}
            </button>
          </li>
        ))}
      </ul>
      {content && (
        <div>
          <h2>{content.title}</h2>
          <p>{content.body}</p>
        </div>
      )}
    </div>
  );
};

export default CourseStart;
