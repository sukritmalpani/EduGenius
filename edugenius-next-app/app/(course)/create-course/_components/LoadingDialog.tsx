"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { motion } from "framer-motion";

const LoadingDialog = ({ loading }: { loading: boolean }) => {
  if (!loading) return null;

  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="max-w-md bg-[#1A1A2E] backdrop-blur-md border border-[#8A2BE2]/50 shadow-lg">
        <AlertDialogHeader className="flex flex-col items-center p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/rocket.gif"
              alt="Generating course"
              width={150}
              height={150}
              priority
              className="mb-4"
            />
          </motion.div>

          <AlertDialogTitle className="text-xl text-center bg-gradient-to-r from-[#8A2BE2] to-[#007BFF] bg-clip-text text-transparent">
            Creating your course...
          </AlertDialogTitle>

          <AlertDialogDescription className="text-center mt-2">
            <p className="text-[#A1A1C1]">
              Our AI is crafting your personalized course content. This may take
              a moment.
            </p>

            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-[#00FFFF] shadow-lg"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoadingDialog;
