import { useState } from "react";
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
  const [answers, setAnswers] = useState<string[]>([]);
  const select = (i: number, opt: string) =>
    setAnswers((a) => {
      a[i] = opt;
      return [...a];
    });
  const onSubmit = () => {
    // validate answers and send to server
    console.log(answers);
    onClose();
  };

  return (
    <div className="modal">
      <button onClick={onClose}>Close</button>
      {questions.map((q, i) => (
        <div key={i}>
          <p>{q.prompt}</p>
          {q.options.map((o) => (
            <button key={o} onClick={() => select(i, o)}>
              {o}
            </button>
          ))}
        </div>
      ))}
      <button onClick={onSubmit} className="mt-4">
        Submit Quiz
      </button>
    </div>
  );
}
