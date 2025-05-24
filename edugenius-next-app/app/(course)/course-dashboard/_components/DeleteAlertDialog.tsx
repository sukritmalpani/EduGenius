import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

type DeleteAlertDialogProps = {
  open: boolean;
  setIsOpen: (value: boolean) => void;
  handleDeleteCourse: () => void;
};

const DeleteAlertDialog = ({
  open,
  setIsOpen,
  handleDeleteCourse,
}: DeleteAlertDialogProps) => {
  const deleteCourse = () => {
    handleDeleteCourse();
    setIsOpen(false);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-md bg-[#1A1A2E] border border-[#8A2BE2] shadow-lg rounded-xl overflow-hidden">
        <AlertDialogHeader className="space-y-3">
          <div className="mx-auto bg-red-500/10 p-4 rounded-full w-fit mb-4">
            <FaTrashAlt className="h-8 w-8 text-red-500" />
          </div>

          <AlertDialogTitle className="text-center text-2xl font-bold text-[#00FFFF]">
            Delete Course
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-[#A1A1C1] text-base">
            This action cannot be undone. This will permanently delete your
            course and remove all associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-3 mt-6">
          <AlertDialogCancel
            onClick={() => setIsOpen(false)}
            className="mt-2 sm:mt-0 w-full border-[#8A2BE2] text-[#A1A1C1] hover:bg-[#8A2BE2]/20 transition-all rounded-lg py-2.5"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteCourse()}
            className="mt-2 sm:mt-0 w-full bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 transition-all rounded-lg py-2.5"
          >
            Delete Course
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;