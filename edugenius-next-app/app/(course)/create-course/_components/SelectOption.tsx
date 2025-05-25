"use client";
import { useContext } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { UserInputContext } from "../_context/UserInputContext";
import { motion } from "framer-motion";

const SelectOption = () => {
  const { userInput, setUserInput } = useContext(UserInputContext);
  const set = (k, v) => setUserInput((prev) => ({ ...prev, [k]: v }));

  return (
    <motion.div>
      <h2>Settings</h2>
      <Select
        onValueChange={(v) => set("difficulty", v)}
        defaultValue={userInput.difficulty}
      >
        <SelectTrigger placeholder="Difficulty" />
        <SelectContent>
          {["Beginner", "Intermediate", "Advanced"].map((l) => (
            <SelectItem key={l} value={l}>
              {l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(v) => set("duration", v)}
        defaultValue={userInput.duration}
      >
        <SelectTrigger placeholder="Duration" />
        <SelectContent>
          {["1 Hour", "2 Hours", "3+ Hours"].map((l) => (
            <SelectItem key={l} value={l}>
              {l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="number"
        placeholder="Number of Chapters"
        defaultValue={userInput.totalChapters}
        onChange={(e) => set("totalChapters", e.target.value)}
      />
    </motion.div>
  );
};

export default SelectOption;
