"use client";
import { useContext } from "react";
import { categoryList } from "../_shared/CategoryList";
import Image from "next/image";
import { UserInputContext } from "../_context/UserInputContext";
import { motion } from "framer-motion";

const SelectCategory = () => {
  const { userInput, setUserInput } = useContext(UserInputContext);
  const pick = (cat: string) =>
    setUserInput((prev) => ({ ...prev, category: cat }));

  return (
    <div>
      <h2>Select a category</h2>
      <div className="grid gap-4">
        {categoryList.map((c) => (
          <motion.div key={c.name} onClick={() => pick(c.name)}>
            <Image src={c.icon} alt={c.name} width={80} height={80} />
            <p>{c.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
