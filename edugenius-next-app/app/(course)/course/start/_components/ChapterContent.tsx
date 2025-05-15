interface ChapterContentProps {
  content: { title: string; body: string };
}

export default function ChapterContent({ content, handleNext }: any) {
  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.body}</p>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
