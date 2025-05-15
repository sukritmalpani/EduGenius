export default function QuizModal({ isOpen, onClose }: any) {
    if (!isOpen) return null;
    return (
      <div className="modal">
        <button onClick={onClose}>Close</button>
        <p>Quiz goes here</p>
      </div>
    );
  }
  