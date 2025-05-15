interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: { prompt: string; options: string[] }[];
}

export default function QuizModal({
  isOpen,
  onClose,
  questions,
}: QuizModalProps) {
  if (!isOpen) return null;
  return (
    <div className="modal">
      {questions.map((q, i) => (
        <div key={i}>
          <p>{q.prompt}</p>
        </div>
      ))}
    </div>
  );
}
