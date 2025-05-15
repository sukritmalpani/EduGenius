export type ChapterListCardProps = {
  chapter: { chapter_name: string };
};

export default function ChapterListCard({ chapter }: ChapterListCardProps) {
  return <div>{chapter.chapter_name}</div>;
}
