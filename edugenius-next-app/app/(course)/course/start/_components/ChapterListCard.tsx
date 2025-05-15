export type ChapterListCardProps = {
    chapter: { chapter_name: string };
    index: number;
    onClick?: () => void;
  };
  
  export default function ChapterListCard({
    chapter,
    index,
    onClick,
  }: ChapterListCardProps) {
   return (
     <div onClick={onClick} className="cursor-pointer">
       <span>{index + 1}.</span> {chapter.chapter_name}
     </div>
   );
  }
  