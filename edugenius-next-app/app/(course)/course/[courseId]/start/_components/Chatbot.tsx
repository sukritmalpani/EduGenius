"use client";
import "regenerator-runtime/runtime";
import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "ai/react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime/runtime";
import type { CourseType } from "@/types/resume.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, X, Send, Mic, VolumeX, User } from "lucide-react";

type ChatbotModalProps = {
  course: CourseType;
};

export default function ChatbotModal({ course }: ChatbotModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { messages, input, handleInputChange, setInput, isLoading, error } =
    useChat({
      api: "/api/chat",
      onError: (error) => {
        console.error("Chat error:", error);
      },
    });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript, setInput]);

  const startListening = () => {
    try {
      SpeechRecognition.startListening({ continuous: true });
    } catch (error) {
      console.error("Error starting speech recognition:", error);
    }
  };

  const stopListening = () => {
    try {
      SpeechRecognition.stopListening();
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
    }
  };

  const handleVoiceInput = () => {
    if (listening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  const speakMessage = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (listening) {
      stopListening();
    }

    if (!input.trim()) return;

    const payload = {
      input,
      course,
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      console.log("Chat response:", data.result);
      speakMessage(data.result);
      setInput("");
      messages.push({
        content: data.result,
        role: "system",
        id: (messages.length + 1).toString(),
      });
    } catch (e) {
      console.log("Error", e);
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    console.warn("Browser doesn't support speech recognition.");
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 w-[400px] z-50"
          >
            <Card className="shadow-xl border-primary/10 overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground py-4 px-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    Course Assistant
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 rounded-full text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="h-[350px] overflow-y-auto p-4 bg-muted/30 space-y-4">
                  {messages.length === 0 && (
                    <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                      <div className="max-w-xs">
                        <Bot className="h-12 w-12 mx-auto mb-4 text-primary/60" />
                        <p>
                          Hi there! I'm your course assistant. Ask me anything
                          about this course.
                        </p>
                      </div>
                    </div>
                  )}

                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start gap-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <Avatar
                          className={`h-8 w-8 ${message.role === "user" ? "bg-primary" : "bg-secondary"}`}
                        >
                          {message.role === "user" ? (
                            <User className="h-4 w-4 text-primary-foreground" />
                          ) : (
                            <Bot className="h-4 w-4 text-secondary-foreground" />
                          )}
                          <AvatarFallback>
                            {message.role === "user" ? "U" : "B"}
                          </AvatarFallback>
                        </Avatar>

                        <div
                          className={`rounded-lg px-3 py-2 text-sm ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start gap-2 max-w-[80%]">
                        <Avatar className="h-8 w-8 bg-destructive">
                          <Bot className="h-4 w-4 text-destructive-foreground" />
                          <AvatarFallback>B</AvatarFallback>
                        </Avatar>

                        <div className="rounded-lg px-3 py-2 text-sm bg-destructive/10 text-destructive border border-destructive/20">
                          {error.message ||
                            "I'm having trouble connecting right now. Please try again later."}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start gap-2 max-w-[80%]">
                        <Avatar className="h-8 w-8 bg-secondary">
                          <Bot className="h-4 w-4 text-secondary-foreground" />
                          <AvatarFallback>B</AvatarFallback>
                        </Avatar>

                        <div className="rounded-lg px-3 py-2 text-sm bg-secondary text-secondary-foreground">
                          <div className="flex space-x-1">
                            <div
                              className="h-2 w-2 rounded-full bg-current animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            />
                            <div
                              className="h-2 w-2 rounded-full bg-current animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            />
                            <div
                              className="h-2 w-2 rounded-full bg-current animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="p-3 border-t">
                <form onSubmit={handleFormSubmit} className="flex w-full gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="flex-grow"
                  />

                  <div className="flex gap-1">
                    <Button
                      type="button"
                      onClick={handleVoiceInput}
                      variant={listening ? "destructive" : "secondary"}
                      size="icon"
                      className="rounded-full"
                    >
                      <Mic className="h-4 w-4" />
                    </Button>

                    {isSpeaking && (
                      <Button
                        type="button"
                        onClick={stopSpeaking}
                        variant="destructive"
                        size="icon"
                        className="rounded-full"
                      >
                        <VolumeX className="h-4 w-4" />
                      </Button>
                    )}

                    <Button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      size="icon"
                      className="rounded-full"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
