"use client";

import { motion } from "framer-motion";

const SkeletonLoading = ({ items }: { items: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: items || 5 }, (_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex flex-col space-y-3 rounded-xl border border-[#8A2BE2]/20 bg-[#1A1A2E] overflow-hidden shadow-lg"
        >
          <div className="w-full bg-[#2C3E50] animate-pulse rounded-t-xl h-[180px]"></div>
          <div className="space-y-3 p-5">
            <div className="h-6 bg-[#2C3E50] animate-pulse rounded-md w-3/4"></div>
            <div className="h-4 bg-[#2C3E50] animate-pulse rounded-md w-1/2"></div>
            <div className="flex gap-2 pt-2">
              <div className="h-8 bg-[#2C3E50] animate-pulse rounded-full w-1/3"></div>
              <div className="h-8 bg-[#2C3E50] animate-pulse rounded-full w-1/3"></div>
            </div>
            <div className="h-px bg-[#2C3E50] animate-pulse rounded-md w-full my-4"></div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-[#2C3E50] animate-pulse rounded-full"></div>
              <div className="h-4 bg-[#2C3E50] animate-pulse rounded-md w-1/3"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoading;