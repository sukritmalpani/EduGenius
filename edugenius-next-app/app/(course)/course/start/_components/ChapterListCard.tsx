import { ChapterType } from "@/types/resume.type";
import React from "react";
export type ChapterListCardProps = {
  chapter: ChapterType;
  index: number;
  onClick?: () => void;
  isActive?: boolean;
  isCompleted?: boolean;
};

const ChapterListCard = React.memo(function ChapterListCard({
  chapter,
  index,
  onClick,
  isActive,
  isCompleted,
}: ChapterListCardProps) {
  const base = "p-2 rounded";
  const activeCls = isActive ? "bg-blue-500 text-white" : "";
  const doneCls = isCompleted ? "opacity-50" : "";
  return (
    <div onClick={onClick} className={`${base} ${activeCls} ${doneCls}`}>
      <span className="font-mono mr-1">{index + 1}.</span>{" "}
      {chapter.chapter_name}
    </div>
  );
});

export default ChapterListCard;
