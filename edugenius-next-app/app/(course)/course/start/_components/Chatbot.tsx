import { useState } from "react";

export default function ChatbotModal({ course }: any) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen((o) => !o)}>Chat</button>
      {open && <div className="chatbot">Chatbot UI</div>}
    </>
  );
}
