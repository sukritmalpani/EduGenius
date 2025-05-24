// DeleteAlertDialog.tsx

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
            onClick={deleteCourse}
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
