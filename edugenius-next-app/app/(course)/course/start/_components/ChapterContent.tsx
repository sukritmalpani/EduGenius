interface ChapterContentProps {
  content: { title: string; body: string };
}

export default function ChapterContent({ content }: ChapterContentProps) {
  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.body}</p>
    </div>
  );
}
