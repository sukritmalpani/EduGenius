"use client";

import { db } from "@/configs/db";
import { CourseList } from "@/db/schema/chapter";
import type { CourseType } from "@/types/resume.type";
import { useEffect, useState, useCallback } from "react";
import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SkeletonLoading from "./SkeletonLoading";
import {
  Compass,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

const ExplorePage = () => {
  const [courseList, setCourseList] = useState<CourseType[] | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const getAllCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await db
        .select()
        .from(CourseList)
        .limit(9)
        .offset(pageIndex * 9);
      setCourseList(result as CourseType[]);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  }, [pageIndex]);

  useEffect(() => {
    getAllCourses();
  }, [getAllCourses]);

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
                className="pl-10 bg-[#1A1A2E] border-[#8A2BE2] text-white rounded-lg focus:ring-[#00FFFF] focus:border-[#00FFFF]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px] bg-[#1A1A2E] border-[#8A2BE2] text-white rounded-lg focus:ring-[#00FFFF] focus:border-[#00FFFF]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-[#8A2BE2]" />
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A2E] border-[#8A2BE2] text-white">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <SkeletonLoading items={9} />
        ) : courseList && courseList.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {courseList.map((course, index) => (
              <motion.div
                key={course.courseId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <CourseCard
                  course={course}
                  onRefresh={getAllCourses}
                  displayUser={true}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-[#1A1A2E]/50 rounded-2xl border border-dashed border-[#8A2BE2]/30">
            <div className="bg-[#8A2BE2]/20 p-6 rounded-full mb-6">
              <Compass className="h-10 w-10 text-[#8A2BE2]" />
            </div>
            <h3 className="text-2xl font-bold text-[#00FFFF] mb-3">
              No courses found
            </h3>
            <p className="text-[#A1A1C1] mb-3">No courses found</p>
            <p className="text-[#A1A1C1] max-w-md text-lg">
              There are no courses available at the moment. Check back later or
              create your own!
            </p>
          </div>
        )}

        {courseList && courseList.length > 0 && (
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#2C3E50]">
            <Button
              variant="outline"
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              disabled={pageIndex === 0}
              className="gap-2 border-[#8A2BE2] text-[#A1A1C1] hover:bg-[#8A2BE2]/20 transition-all"
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
              disabled={!courseList || courseList.length < 9}
              className="gap-2 border-[#8A2BE2] text-[#A1A1C1] hover:bg-[#8A2BE2]/20 transition-all"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExplorePage;