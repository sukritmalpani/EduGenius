"use client";

import { db } from "@/configs/db";
import { CourseChapters, CourseList } from "@/db/schema/chapter";
import type {
  ChapterContentType,
  ChapterType,
  CourseType,
} from "@/types/resume.type";
import { and, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import Image from "next/image";
import UserToolTip from "./_components/UserToolTip";
import ScrollProgress from "@/components/ui/scroll-progress";
import QuizModal from "./_components/QuizModal";
import ChatbotModal from "./_components/Chatbot";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  BookOpen,
  ChevronRight,
  MessageSquare,
  X,
  Clock,
  Award,
} from "lucide-react";
import DownloadButton from "./_components/DownloadButton";

type CourseStartProps = {
  params: { courseId: string };
};

const CourseStart = ({ params }: CourseStartProps) => {
  const [course, setCourse] = useState<CourseType | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<ChapterType | null>(
    null
  );
  const [chapterContent, setChapterContent] =
    useState<ChapterContentType | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number | null>(
    null
  );
  const router = useRouter();

  const getCourse = async () => {
    setIsLoading(true);
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, params.courseId));

      setCourse(result[0] as CourseType);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params) {
      getCourse();
    }
  }, [params]); // Removed getCourse from dependencies

  const getChapterContent = async (chapterId: number) => {
    try {
      setCurrentChapterIndex(chapterId);
      const res = await db
        .select()
        .from(CourseChapters)
        .where(
          and(
            eq(CourseChapters.chapterId, chapterId),
            eq(CourseChapters.courseId, course?.courseId || "")
          )
        );

      setChapterContent(res[0] as ChapterContentType);
      console.log(res[0]);
      // Close sidebar on mobile after selecting a chapter
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    } catch (error) {
      console.error("Error fetching chapter content:", error);
    }
  };

  const handleNext = () => {
    if (chapterContent?.quiz) {
      setIsQuizOpen(true); // Open the quiz modal
    } else if (currentChapterIndex !== null && course?.courseOutput.chapters) {
      // Move to next chapter if available
      const nextChapterIndex = currentChapterIndex + 1;
      if (nextChapterIndex < course.courseOutput.chapters.length) {
        setSelectedChapter(course.courseOutput.chapters[nextChapterIndex]);
        getChapterContent(nextChapterIndex);
      }
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6 md:p-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar skeleton */}
            <div className="hidden md:block w-full md:w-64 shrink-0">
              <Skeleton className="h-12 w-full mb-4" />
              <div className="space-y-3">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
              </div>
            </div>

            {/* Main content skeleton */}
            <div className="flex-1">
              <Skeleton className="h-64 w-full mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <div className="rounded-full bg-red-100 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <X className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find the course you're looking for. It may have been
              removed or you might have followed an invalid link.
            </p>
            <Button onClick={() => router.push("/courses")}>
              Browse Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate course progress
  const progress = course.progress || 0;
  const completedChapters = Math.floor(
    (progress / 100) * (course.courseOutput.chapters.length || 1)
  );

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white relative flex">
      {/* Mobile sidebar toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 left-6 z-50 md:hidden bg-[#8A2BE2] hover:bg-[#6a1dbf] text-white shadow-lg rounded-full h-12 w-12"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar - responsive */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#2C3E50] shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:relative md:w-72 md:shrink-0 md:shadow-none`}
      >
        {/* Sidebar container with fixed height and flex column layout */}
        <div className="h-full flex flex-col">
          {/* Course title - fixed at top */}
          <div className="bg-[#8A2BE2] text-white p-4 flex items-center justify-between shrink-0">
            <h2 className="font-medium text-lg truncate">
              {course.courseOutput.topic}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={toggleSidebar}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Course progress - fixed below title */}
          <div className="p-4 border-b border-[#8A2BE2] shrink-0">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Your Progress</span>
              <Badge
                variant="outline"
                className="border-[#8A2BE2] text-[#00FFFF] font-mono"
              >
                {completedChapters}/{course.courseOutput.chapters.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-2 bg-[#2C3E50]" />
          </div>

          {/* Scrollable chapter list container */}
          <div
            className="flex-1 overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#8A2BE2 #2C3E50",
            }}
          >
            {/* Chapter list content */}
            <div className="p-2 space-y-2">
              {course.courseOutput.chapters.map((chapter, index) => (
                <div
                  key={index}
                  className={`rounded-md transition-colors cursor-pointer ${
                    selectedChapter?.chapter_name === chapter.chapter_name
                      ? "bg-[#8A2BE2]/20 border-l-4 border-[#8A2BE2]"
                      : index < completedChapters
                        ? "bg-green-50 dark:bg-green-950/10"
                        : "hover:bg-[#2C3E50]/50"
                  }`}
                  onClick={() => {
                    setSelectedChapter(chapter);
                    getChapterContent(index);
                  }}
                >
                  <ChapterListCard
                    chapter={chapter}
                    index={index}
                    isCompleted={index < completedChapters}
                    isActive={
                      selectedChapter?.chapter_name === chapter.chapter_name
                    }
                  />
                </div>
              ))}
              {/* Forum link */}
              <div
                className="rounded-md transition-colors cursor-pointer hover:bg-muted/50"
                onClick={() => router.push(`/forum/${course.id}`)}
              >
                <div className="p-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium truncate">Course Forum</h3>
                    <p className="text-xs text-muted-foreground truncate">
                      Discuss with other learners
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8">
        {selectedChapter ? (
          <div>
            <ChapterContent
              course={course}
              chapter={selectedChapter}
              content={chapterContent}
              handleNext={handleNext}
            />
            <DownloadButton
              chapter_name={selectedChapter.chapter_name}
              chapter={chapterContent}
            />
            {isQuizOpen && chapterContent?.quiz && (
              <QuizModal
                isOpen={isQuizOpen}
                onClose={() => setIsQuizOpen(false)}
                questions={chapterContent.quiz}
                courseId={course.courseId}
                totalChapters={course.courseOutput.chapters.length}
              />
            )}
            <ScrollProgress />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {/* Course introduction */}
            <div className="flex flex-col items-center text-center space-y-8 py-12">
              <Badge
                variant="outline"
                className="border-[#8A2BE2] text-[#00FFFF] px-3 py-1"
              >
                {course.courseOutput.chapters.length} Chapters •{" "}
                {course.duration || "Self-paced"}
              </Badge>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#00FFFF]">
                {course.courseOutput.topic}
              </h1>

              <div className="relative aspect-video w-full max-w-2xl overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={course.courseBanner || "/thumbnail.png"}
                  alt={course.courseName || "Course Banner"}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>

              <div className="prose dark:prose-invert max-w-2xl">
                <p className="text-lg text-gray-400">
                  Welcome to {course.courseOutput.topic}. This course will guide
                  you through all the essential concepts and practical skills
                  you need to master this subject. Click on any chapter in the
                  sidebar to begin your learning journey.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  size="lg"
                  className="gap-2 bg-[#007BFF] hover:bg-[#0056b3] text-white"
                  onClick={() => {
                    if (course.courseOutput.chapters.length > 0) {
                      setSelectedChapter(course.courseOutput.chapters[0]);
                      getChapterContent(0);
                    }
                  }}
                >
                  Start Learning
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 border-[#8A2BE2] text-[#00FFFF] hover:bg-[#8A2BE2]/20"
                  onClick={() => router.push(`/forum/${course.id}`)}
                >
                  <MessageSquare className="h-4 w-4" />
                  Join Discussion
                </Button>
              </div>

              {/* Course details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
                <Card className="bg-[#2C3E50] border border-[#8A2BE2]">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Clock className="h-8 w-8 text-[#8A2BE2] mb-2" />
                    <h3 className="font-medium text-white">Course Duration</h3>
                    <p className="text-gray-400">
                      {course.duration || "Self-paced learning"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-[#2C3E50] border border-[#8A2BE2]">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <BookOpen className="h-8 w-8 text-[#8A2BE2] mb-2" />
                    <h3 className="font-medium text-white">Total Chapters</h3>
                    <p className="text-gray-400">
                      {course.courseOutput.chapters.length} comprehensive
                      lessons
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-[#2C3E50] border border-[#8A2BE2]">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Award className="h-8 w-8 text-[#8A2BE2] mb-2" />
                    <h3 className="font-medium text-white">Certificate</h3>
                    <p className="text-gray-400">Earn upon completion</p>
                  </CardContent>
                </Card>
              </div>

              {/* Instructor info */}
              <UserToolTip
                username={course.username || "AI Course Generator"}
                userProfileImage={course.userprofileimage || "/userProfile.png"}
              />
            </div>
          </div>
        )}

        {/* Chatbot */}
        <ChatbotModal course={course} />
      </div>
    </div>
  );
};

export default CourseStart;
