"use client";
import { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserInputContext } from "../_context/UserInputContext";
import { motion } from "framer-motion";

const TopicDesc = () => {
  const { userInput, setUserInput } = useContext(UserInputContext);
  const onChange = (k: "topic" | "description", v: string) =>
    setUserInput(prev => ({ ...prev, [k]: v }));

  return (
    <motion.div>
      <h2>Define topic & description</h2>
      <Input
        placeholder="Course Topic"
        defaultValue={userInput.topic}
        onChange={e => onChange("topic", e.target.value)}
      />
      <Textarea
        placeholder="Course Description"
        defaultValue={userInput.description}
        onChange={e => onChange("description", e.target.value)}
      />
    </motion.div>
  );
};

export default TopicDesc;
