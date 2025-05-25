"use client";

import { UserInputContext } from "@/app/(course)/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserInputType } from "@/types/resume.type";
import { useContext } from "react";
import { motion } from "framer-motion";

const SelectOption = () => {
  const { userInput, setUserInput } = useContext(UserInputContext);

  const handleInputChange = (
    fieldName: keyof UserInputType,
    value: string | number
  ) => {
    setUserInput((prev) => ({ ...prev, [fieldName]: value }));
  };

  const optionItems = [
    {
      label: "Difficulty Level",
      icon: "🎓",
      field: "difficulty" as keyof UserInputType,
      type: "select",
      options: [
        { value: "Beginner", label: "Beginner" },
        { value: "Intermediate", label: "Intermediate" },
        { value: "Advance", label: "Advanced" },
      ],
      description: "Choose the appropriate level for your target audience",
    },
    {
      label: "Course Duration",
      icon: "⏳",
      field: "duration" as keyof UserInputType,
      type: "select",
      options: [
        { value: "1 Hour", label: "1 Hour" },
        { value: "2 Hours", label: "2 Hours" },
        { value: "More than 3 Hours", label: "More than 3 Hours" },
      ],
      description: "Estimate how long it will take to complete the course",
    },
    {
      label: "Include Video",
      icon: "🎥",
      field: "video" as keyof UserInputType,
      type: "select",
      options: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
      description: "Would you like to include video content in your course?",
    },
    {
      label: "Number of Chapters",
      icon: "📄",
      field: "totalChapters" as keyof UserInputType,
      type: "number",
      description: "How many chapters should your course have?",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-6 text-[#00FFFF]">
        Configure your course settings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {optionItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="space-y-2"
          >
            <label className="flex items-center text-sm font-medium text-[#A1A1C1]">
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </label>

            {item.type === "select" ? (
              <Select
                onValueChange={(value) => handleInputChange(item.field, value)}
                defaultValue={userInput?.[item.field] as string}
              >
                <SelectTrigger className="bg-[#1A1A2E] border-[#8A2BE2] text-[#A1A1C1] shadow-md hover:border-[#00FFFF]">
                  <SelectValue placeholder={`Select ${item.label}`} />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A2E] border-[#8A2BE2] text-[#A1A1C1]">
                  {item.options?.map((option, optIndex) => (
                    <SelectItem key={optIndex} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type="number"
                min="1"
                max="20"
                onChange={(e) => handleInputChange(item.field, e.target.value)}
                defaultValue={userInput?.[item.field] as string}
                className="bg-[#1A1A2E] border-[#8A2BE2] text-[#A1A1C1] shadow-md hover:border-[#00FFFF]"
              />
            )}

            <p className="text-xs text-[#A1A1C1]">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SelectOption;
