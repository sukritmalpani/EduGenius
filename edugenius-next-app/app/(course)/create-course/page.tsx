"use client";
import { useContext, useEffect, useState } from "react";
import { stepperOptions } from "./_constants/stepperOptions";
import { Button } from "@/components/ui/button";
import SelectCategory from "./_components/SelectCategory";
import TopicDesc from "./_components/TopicDesc";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { generateCourseLayout } from "@/configs/ai-models";
import LoadingDialog from "./_components/LoadingDialog";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { storeDataInDatabase } from "./_utils/saveDataInDb";
import uuid4 from "uuid4";
import { useRouter } from "next/navigation";
import { db } from "@/configs/db";
import { CourseList } from "@/db/schema/chapter";
import { eq } from "drizzle-orm";
import type { CourseType } from "@/types/resume.type";
import { UserCourseListContext } from "../_context/UserCourseList.context";

const CreateCoursePage = () => {
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { userInput } = useContext(UserInputContext);
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const getUserCourses = async () => {
    if (!user?.email) return;
    try {
      const res = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.createdBy, user.email));
      setUserCourseList(res as CourseType[]);
    } catch (error) {
      console.error("Error fetching user courses:", error);
    }
  };

  const allowNextStep = () => {
    if (step === 0) return !!userInput?.category;
    if (step === 1) return !!userInput?.topic && !!userInput?.description;
    if (step === 2) {
      return (
        !!userInput?.difficulty &&
        !!userInput?.duration &&
        !!userInput?.video &&
        !!userInput?.totalChapters
      );
    }
    return false;
  };

  const generateCourse = async () => {
    const BASIC_PROMPT = `Generate a course tutorial on following details with field name, description, along with the chapter name about and duration: Category '${userInput?.category}' Topic '${userInput?.topic}' Description '${userInput.description}' Level '${userInput?.difficulty}' Duration '${userInput?.duration}' chapters '${userInput?.totalChapters}' in JSON format.\n`;
    setLoading(true);
    try {
      const id = uuid4();
      const result = await generateCourseLayout.sendMessage(BASIC_PROMPT);
      const data = JSON.parse(result.response.text());
      console.log("This is the data", data);
      await storeDataInDatabase(id, userInput, data, user);
      router.replace(`/create-course/${id}`);
    } catch (error) {
      console.error("Error generating course:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) getUserCourses();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#007BFF] bg-clip-text text-transparent mb-4">
          Create Your AI Course
        </h1>
        <p className="text-[#A1A1C1] max-w-2xl mx-auto">
          Design personalized learning experiences with our AI-powered course
          generator
        </p>
      </div>

      {/* Stepper */}
      <div className="relative mb-16">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#2C3E50] -translate-y-1/2 rounded-full"></div>
        <div className="flex justify-between relative z-10">
          {stepperOptions.map((option, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  step >= index
                    ? "bg-[#8A2BE2] border-[#00FFFF] text-white shadow-md"
                    : "bg-[#1A1A2E] border-[#2C3E50] text-[#A1A1C1]"
                }`}
              >
                <option.icon className="w-5 h-5" />
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  step >= index ? "text-[#00FFFF]" : "text-[#A1A1C1]"
                }`}
              >
                {option.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-[#1A1A2E] rounded-xl shadow-md border border-[#2C3E50] p-6 mb-8">
        {step === 0 ? (
          <SelectCategory />
        ) : step === 1 ? (
          <TopicDesc />
        ) : (
          <SelectOption />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
          className="border-[#8A2BE2] text-[#A1A1C1] hover:bg-[#2C3E50] px-6"
        >
          Previous
        </Button>

        {stepperOptions.length - 1 === step ? (
          <Button
            disabled={!allowNextStep() || loading}
            onClick={generateCourse}
            className="bg-gradient-to-r from-[#8A2BE2] to-[#007BFF] hover:from-[#6A1B9A] hover:to-[#0056b3] text-white px-6 shadow-lg"
          >
            Generate Course
          </Button>
        ) : (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={!allowNextStep()}
            className="bg-gradient-to-r from-[#8A2BE2] to-[#007BFF] hover:from-[#6A1B9A] hover:to-[#0056b3] text-white px-6 shadow-lg"
          >
            Next
          </Button>
        )}
      </div>

      <LoadingDialog loading={loading} />
    </div>
  );
};

export default CreateCoursePage;
