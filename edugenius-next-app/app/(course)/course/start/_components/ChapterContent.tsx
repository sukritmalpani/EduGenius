import React, { useEffect, useState } from "react";
import {
  ChapterContentType,
  ChapterType,
  CourseType,
} from "@/types/resume.type";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Code, BookOpen, Timer, ChevronRight } from "lucide-react";

type ChapterContentProps = {
  course: CourseType;
  chapter: ChapterType | null;
  content: ChapterContentType | null;
  handleNext: () => void;
};

const ChapterContent = ({
  course,
  chapter,
  content,
  handleNext,
}: ChapterContentProps) => {
  const [outputs, setOutputs] = useState<{ [key: string]: string | null }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState<string>("video");

  useEffect(() => {
    console.log("Updated Video ID:", content?.videoId);
  }, [content?.videoId]);


  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-[#1A1A2E] text-white">
      <div className="flex flex-col space-y-6">
        {/* Chapter Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-[#8A2BE2] text-[#00FFFF]"
            >
              {course?.courseName}
            </Badge>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Badge variant="secondary" className="bg-[#8A2BE2] text-white">
              {chapter?.chapter_name}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#00FFFF]">
            {chapter?.chapter_name}
          </h1>
          <p className="text-gray-400 flex items-center gap-2">
            <Timer className="h-4 w-4 text-[#8A2BE2]" />
            {chapter?.duration}
          </p>
          <p className="text-gray-400 max-w-3xl">{chapter?.description}</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleNext}
            size="lg"
            className="gap-2 bg-[#007BFF] hover:bg-[#0056b3] text-white"
          >
            Take Quiz
            <ChevronRight className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChapterContent;
