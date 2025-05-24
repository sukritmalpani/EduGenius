// DropDownOptions.tsx
"use client";

import type React from "react";
import { motion } from "framer-motion";
import { FaTrashAlt, FaEdit, FaShareAlt } from "react-icons/fa";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DropDownOptionsProps = {
  children: React.ReactNode;
  handleDeleteCourse: () => void;
};

const DropDownOptions = ({
  children,
  handleDeleteCourse,
}: DropDownOptionsProps) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full hover:bg-[#8A2BE2]/20 p-1.5 transition-colors cursor-pointer"
          >
            {children}
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-52 bg-[#1A1A2E] shadow-lg border border-[#8A2BE2] rounded-lg overflow-hidden"
        >
          <DropdownMenuItem className="cursor-pointer flex items-center gap-3 py-3 px-4 hover:bg-[#8A2BE2]/20 text-[#A1A1C1] transition-colors">
            <FaEdit className="text-[#00FFFF]" size={14} />
            <span>Edit Course</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer flex items-center gap-3 py-3 px-4 hover:bg-[#8A2BE2]/20 text-[#A1A1C1] transition-colors">
            <FaShareAlt className="text-[#00FFFF]" size={14} />
            <span>Share Course</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer flex items-center gap-3 py-3 px-4 text-red-400 hover:bg-red-700/20 transition-all"
          >
            <FaTrashAlt size={14} />
            <span>Delete Course</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDownOptions;
