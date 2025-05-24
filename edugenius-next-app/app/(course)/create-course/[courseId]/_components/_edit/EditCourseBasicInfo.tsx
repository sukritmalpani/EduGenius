"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/configs/db";
import { CourseList } from "@/db/schema/chapter";
import { eq } from "drizzle-orm";
import type { CourseType } from "@/types/resume.type";

type EditCourseBasicInfoProps = {
  courseInfo: CourseType | null;
  onRefresh: (refresh: boolean) => void;
};

const EditCourseBasicInfo = ({
  courseInfo,
  onRefresh,
}: EditCourseBasicInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  useEffect(() => {
    if (courseInfo) {
      setCourseTitle(courseInfo.courseOutput.topic);
      setCourseDescription(courseInfo.courseOutput.description);
    }
  }, [courseInfo]);

  if (!courseInfo) return null;

  const updateCourseInfo = async () => {
    await db
      .update(CourseList)
      .set({
        courseOutput: {
          ...courseInfo.courseOutput,
          topic: courseTitle,
          description: courseDescription,
        },
      })
      .where(eq(CourseList.id, courseInfo.id));

    onRefresh(true);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-purple-400 transition-all duration-200"
        >
          <FaEdit className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <AnimatePresence>
        {isOpen && (
          <DialogContent forceMount>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-[#1A1A2E] border border-white/10 rounded-lg shadow-xl p-6"
            >
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-slate-300">
                  Edit Course Information
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-400">
                  Modify the course title and description.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label
                    htmlFor="courseTitle"
                    className="text-sm font-medium text-slate-400"
                  >
                    Course Title
                  </label>
                  <Input
                    id="courseTitle"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    className="bg-[#2C3E50] border-white/10 text-slate-300 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="courseDescription"
                    className="text-sm font-medium text-slate-400"
                  >
                    Course Description
                  </label>
                  <Textarea
                    id="courseDescription"
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    className="bg-[#2C3E50] border-white/10 text-slate-300 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              <DialogFooter className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  className="border-white/20 text-slate-400 hover:bg-[#2C3E50]/50"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={updateCourseInfo}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
                >
                  Save changes
                </Button>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default EditCourseBasicInfo;
