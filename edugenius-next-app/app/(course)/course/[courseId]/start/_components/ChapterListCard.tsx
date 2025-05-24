import type { ChapterType } from "@/types/resume.type";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2 } from "lucide-react";

type ChapterListCardProps = {
  chapter: ChapterType;
  index: number;
  isCompleted?: boolean;
  isActive?: boolean;
};

const ChapterListCard = ({
  chapter,
  index,
  isCompleted = false,
  isActive = false,
}: ChapterListCardProps) => {
  return (
    <Card
      className={`transition-all hover:shadow-md border ${
        isActive
          ? "border-[#8A2BE2] bg-[#8A2BE2]/10"
          : isCompleted
            ? "border-green-500/30 bg-green-50/30 dark:bg-green-950/10"
            : "border-[#2C3E50] bg-[#1A1A2E]"
      }`}
    >
      <CardContent className="p-4 flex items-center gap-4">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${
            isCompleted
              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
              : isActive
                ? "bg-[#8A2BE2]/20 text-[#8A2BE2]"
                : "bg-[#2C3E50] text-gray-400"
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <span className="text-sm font-medium">{index + 1}</span>
          )}
        </div>

        <div className="flex-grow">
          <h3 className="font-medium text-base text-white mb-1">
            {chapter.chapter_name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Clock className="h-3 w-3 text-[#00FFFF]" />
            <span>{chapter.duration}</span>
          </div>
        </div>

        {isCompleted && (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
          >
            Completed
          </Badge>
        )}

        {isActive && !isCompleted && (
          <Badge
            variant="outline"
            className="bg-[#8A2BE2]/10 text-[#8A2BE2] border-[#8A2BE2]/50"
          >
            In Progress
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default ChapterListCard;
