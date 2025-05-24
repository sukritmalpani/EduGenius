"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { db } from "@/configs/db";
import { CourseList } from "@/db/schema/chapter";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Trophy,
} from "lucide-react";

type QuizModalProps = {
  isOpen: boolean;
  onClose: () => void;
  questions: Array<{ question: string; options: string[]; answer: string }>;
  courseId: string;
  totalChapters: number;
};

const QuizModal = ({
  isOpen,
  onClose,
  questions,
  courseId,
  totalChapters,
}: QuizModalProps) => {
  const [answers, setAnswers] = useState<string[]>(
    new Array(questions.length).fill("")
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsSubmitting(true);

      // Calculate score
      let score = 0;
      answers.forEach((answer, index) => {
        if (answer === questions[index].answer) score++;
      });

      const percentage = (score / questions.length) * 100;

      if (percentage >= 70) {
        try {
          const currentProgress = await db
            .select({ progress: CourseList.progress })
            .from(CourseList)
            .where(eq(CourseList.courseId, courseId));

          if (currentProgress?.[0]) {
            const progressIncrement = 100 / totalChapters;
            let newProgress = currentProgress[0].progress + progressIncrement;
            newProgress = Math.min(newProgress, 100);

            await db
              .update(CourseList)
              .set({ progress: newProgress })
              .where(eq(CourseList.courseId, courseId));

            // Check if it's the last chapter of the course
            if (currentProgress[0].progress >= 100 - 100 / totalChapters) {
              setIsSubmitting(false);
              router.push(`/certificate/${courseId}`);
              return;
            }
          }
        } catch (error) {
          console.error("Error updating progress:", error);
        }
      }

      setIsSubmitting(false);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleClose = () => {
    setAnswers(new Array(questions.length).fill(""));
    setShowResults(false);
    setCurrentQuestionIndex(0);
    onClose();
  };

  if (!isOpen) return null;

  const correctAnswers = answers.filter(
    (answer, index) => answer === questions[index].answer
  ).length;
  const score = (correctAnswers / questions.length) * 100;
  const passed = score >= 70;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-2xl mx-4 shadow-xl bg-[#1A1A2E] text-white border border-[#8A2BE2]">
        <CardHeader className="border-b border-[#2C3E50]">
          <CardTitle className="text-2xl text-[#00FFFF]">
            {showResults ? "Quiz Results" : "Quiz"}
          </CardTitle>
        </CardHeader>

        {!showResults ? (
          <>
            <CardContent className="p-6">
              {/* Progress indicator */}
              <div className="mb-6 space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span>
                    {Math.round(
                      ((currentQuestionIndex + 1) / questions.length) * 100
                    )}
                    % Complete
                  </span>
                </div>
                <Progress
                  value={((currentQuestionIndex + 1) / questions.length) * 100}
                  className="h-2 bg-[#2C3E50] text-[#00FFFF]"
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-medium text-[#00FFFF]">
                    {questions[currentQuestionIndex].question}
                  </h3>

                  <RadioGroup
                    value={answers[currentQuestionIndex]}
                    onValueChange={handleAnswerChange}
                    className="space-y-3"
                  >
                    {questions[currentQuestionIndex].options.map(
                      (option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center space-x-2 rounded-lg border border-[#2C3E50] p-4 hover:bg-[#2C3E50]/50 transition-colors"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`option-${optionIndex}`}
                          />
                          <Label
                            htmlFor={`option-${optionIndex}`}
                            className="flex-grow cursor-pointer text-white"
                          >
                            {option}
                          </Label>
                        </div>
                      )
                    )}
                  </RadioGroup>
                </motion.div>
              </AnimatePresence>
            </CardContent>

            <CardFooter className="flex justify-between border-t border-[#2C3E50] p-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="gap-2 border-[#8A2BE2] text-[#00FFFF] hover:bg-[#8A2BE2]/20"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={answers[currentQuestionIndex] === "" || isSubmitting}
                className="gap-2 bg-[#007BFF] hover:bg-[#0056b3] text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : currentQuestionIndex === questions.length - 1 ? (
                  <>
                    Finish
                    <Trophy className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardContent className="p-6 text-center space-y-6">
              <div className="py-6">
                {passed ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-500">
                      Congratulations!
                    </h3>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
                      <XCircle className="h-10 w-10 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-red-500">
                      Try Again
                    </h3>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-medium text-[#00FFFF]">
                  Your Score
                </h3>
                <div className="relative h-4 w-full bg-[#2C3E50] rounded-full overflow-hidden">
                  <div
                    className={`absolute h-full ${passed ? "bg-green-500" : "bg-red-500"}`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <p className="text-2xl font-bold">
                  {correctAnswers} / {questions.length} ({Math.round(score)}%)
                </p>
                <p className="text-gray-400">
                  {passed
                    ? "You've passed the quiz! You can now proceed to the next chapter."
                    : "You need at least 70% to pass. Please try again."}
                </p>
              </div>
            </CardContent>

            <CardFooter className="border-t border-[#2C3E50] p-6">
              <Button
                onClick={handleClose}
                className="w-full bg-[#007BFF] hover:bg-[#0056b3] text-white"
              >
                Close
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default QuizModal;
