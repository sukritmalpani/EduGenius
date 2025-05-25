"use client";

import { useContext } from "react";
import { categoryList } from "../_shared/CategoryList";
import Image from "next/image";
import { UserInputContext } from "@/app/(course)/_context/UserInputContext";
import { motion } from "framer-motion";

const SelectCategory = () => {
  const { userInput, setUserInput } = useContext(UserInputContext);

  const handleCategorySelect = (category: string) => {
    setUserInput((prev) => ({ ...prev, category }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-[#00FFFF]">
        Select a category for your course
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryList.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`relative overflow-hidden group rounded-xl border transition-all duration-300 cursor-pointer ${
              userInput?.category === category.name
                ? "border-[#8A2BE2] bg-[#8A2BE2]/20 ring-2 ring-[#8A2BE2]/50"
                : "border-[#2C3E50] hover:border-[#8A2BE2] hover:bg-[#1A1A2E]/50"
            }`}
            onClick={() => handleCategorySelect(category.name)}
          >
            <div className="p-5 flex flex-col items-center">
              <div className="relative w-20 h-20 mb-4">
                <Image
                  src={category.icon || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                  priority
                />
              </div>
              <h3 className="font-medium text-center text-[#A1A1C1]">
                {category.name}
              </h3>

              {userInput?.category === category.name && (
                <div className="absolute top-3 right-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#00FFFF]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
