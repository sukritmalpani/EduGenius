"use client";
import "regenerator-runtime/runtime";
import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "regenerator-runtime/runtime";
import type { CourseType } from "@/types/resume.type";
import { Button } from "@/components/ui/button";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      console.log("Chat response:", data.result);
      speakMessage(data.result);
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
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="p-3 border-t">
                <form onSubmit={handleFormSubmit} className="flex w-full gap-2">
                  <div className="flex gap-1">
                    <Mic className="h-4 w-4" />

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

                    <Button type="submit" size="icon" className="rounded-full">
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
