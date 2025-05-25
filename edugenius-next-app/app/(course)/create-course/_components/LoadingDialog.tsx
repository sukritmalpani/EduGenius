"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { motion } from "framer-motion";

const LoadingDialog = ({ loading }: { loading: boolean }) => {
  if (!loading) return null;
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <motion.div>
            <Image src="/rocket.gif" alt="Loading" width={120} height={120} />
          </motion.div>
          <AlertDialogTitle>Creating your course...</AlertDialogTitle>
          <AlertDialogDescription>Please wait a sec</AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoadingDialog;
