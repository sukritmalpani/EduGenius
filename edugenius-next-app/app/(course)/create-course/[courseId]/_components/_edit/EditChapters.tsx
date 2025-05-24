"use client";

import { useState, useEffect, useCallback } from "react";
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

type EditChapterProps = {
  course: CourseType;
  index: number;
  onRefresh: (refresh: boolean) => void;
};

const EditChapters = ({ course, index, onRefresh }: EditChapterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chapterName, setChapterName] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");

  useEffect(() => {
    if (isOpen) {
      setChapterName(course.courseOutput.chapters[index]?.chapter_name || "");
      setChapterDescription(
        course.courseOutput.chapters[index]?.description || ""
      );
    }
  }, [isOpen, course, index]);

  const updateChapter = useCallback(async () => {
    try {
      const updatedChapters = [...course.courseOutput.chapters];
      updatedChapters[index] = {
        ...updatedChapters[index],
        chapter_name: chapterName,
        description: chapterDescription,
      };

      await db
        .update(CourseList)
        .set({
          courseOutput: { ...course.courseOutput, chapters: updatedChapters },
        })
        .where(eq(CourseList.id, course.id));

      onRefresh(true);
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating chapter:", error);
    }
  }, [chapterName, chapterDescription, course, index, onRefresh]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-indigo-400 transition-all duration-200"
        >
          <FaEdit className="h-4 w-4" />
          <span className="sr-only">Edit chapter</span>
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
              className="bg-white/10 dark:bg-slate-900/80 backdrop-blur-md shadow-xl p-6 rounded-lg border border-white/10"
            >
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-white">
                  Edit Chapter
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-300">
                  Modify the chapter details and save your changes.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label
                    htmlFor="chapterName"
                    className="text-sm font-medium text-gray-300"
                  >
                    Chapter Name
                  </label>
                  <Input
                    id="chapterName"
                    value={chapterName}
                    onChange={(e) => setChapterName(e.target.value)}
                    className="bg-white/5 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="chapterDescription"
                    className="text-sm font-medium text-gray-300"
                  >
                    Chapter Description
                  </label>
                  <Textarea
                    id="chapterDescription"
                    value={chapterDescription}
                    onChange={(e) => setChapterDescription(e.target.value)}
                    className="bg-white/5 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <DialogFooter className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  className="border-gray-500 text-gray-300 hover:bg-white/10 hover:border-indigo-500 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  onClick={updateChapter}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
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

export default EditChapters;
