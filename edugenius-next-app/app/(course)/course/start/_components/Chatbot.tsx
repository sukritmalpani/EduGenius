import { useState } from "react";

export default function ChatbotModal({ course }: any) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  return (
    <>
      <button onClick={() => setOpen(o => !o)}>Chat</button>
      {open && (
        <div className="chatbot">
          <div className="messages">{messages.map((m, i) => <p key={i}>{m}</p>)}</div>
          <input value={input} onChange={e => setInput(e.target.value)} />
          <button onClick={() => {
            setMessages(m => [...m, input]);
            setInput("");
          }}>Send</button>
        </div>
      )}
    </>
  );
}
