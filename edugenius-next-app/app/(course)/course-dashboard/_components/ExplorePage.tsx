"use client";

import { useEffect, useState, useCallback } from "react";
import { Compass, ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SkeletonLoading = ({ items = 9 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {Array.from({ length: items }).map((_, i) => (
      <div
        key={i}
        className="animate-pulse bg-[#2D2D44] h-32 rounded-lg"
      />
    ))}
  </div>
);

const ExplorePage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [courseList, setCourseList] = useState<any[]>([]);

  const fetchCourses = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      const dummy = Array.from({ length: 9 }, (_, i) => ({
        courseId: `${pageIndex * 9 + i + 1}`,
        title: `Course ${pageIndex * 9 + i + 1}`,
      }));
      setCourseList(dummy);
      setIsLoading(false);
    }, 500);
  }, [pageIndex]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-4 bg-[#1A1A2E] text-[#A1A1C1] rounded-xl"
    >
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center text-[#00FFFF] mb-2">
              <span className="bg-[#8A2BE2]/20 p-2 rounded-lg mr-3">
                <Compass className="h-6 w-6 text-[#8A2BE2]" />
              </span>
              Explore More Courses
            </h2>
            <p className="text-[#A1A1C1] text-lg">
              Discover AI-generated courses created by the community
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8A2BE2]" />
              <Input
                placeholder="Search courses..."
                className="pl-10 bg-[#1A1A2E] border-[#8A2BE2] text-white rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px] bg-[#1A1A2E] border-[#8A2BE2] text-white rounded-lg">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-[#8A2BE2]" />
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A2E] border-[#8A2BE2] text-white">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <SkeletonLoading items={9} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {courseList.map((course) => (
              <div
                key={course.courseId}
                className="p-6 bg-[#2D2D44] rounded-lg text-white"
              >
                {course.title}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#2C3E50]">
          <Button
            variant="outline"
            onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
            disabled={pageIndex === 0}
            className="gap-2 border-[#8A2BE2] text-[#A1A1C1]"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <Badge
            variant="secondary"
            className="px-4 py-2 bg-[#8A2BE2] text-white font-medium"
          >
            Page {pageIndex + 1}
          </Badge>

          <Button
            variant="outline"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={courseList.length < 9}
            className="gap-2 border-[#8A2BE2] text-[#A1A1C1]"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExplorePage;
