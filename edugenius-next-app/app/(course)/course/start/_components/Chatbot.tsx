import { useEffect, useState } from "react";
 export default function ChatbotModal({ course }: any) {
   const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

   return (
     <>
       <button onClick={() => setOpen(o => !o)}>Chat</button>
      {open && (
        <div className="chatbot">
          {messages.map((m, i) => <p key={i}>{m}</p>)}
        </div>
      )}
     </>
   );
 }
