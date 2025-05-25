"use client";
import { useState } from "react";
import { stepperOptions } from "./_constants/stepperOptions";
import { Button } from "@/components/ui/button";
import SelectCategory from "./_components/SelectCategory";

const CreateCoursePage = () => {
  const [step, setStep] = useState(0);

  return (
    <div className="max-w-4xl mx-auto">
      <h1>Create Your AI Course</h1>
      {/* stepper */}
      <div>
        {stepperOptions.map((opt, i) => (
          <span key={i}>{opt.name}</span>
        ))}
      </div>
      {/* placeholder for step content */}
      <div>
        {step === 0 && <SelectCategory />}
        {/* other steps will come */}
      </div>
      <div>
        <Button onClick={() => setStep(step - 1)} disabled={step === 0}>
          Previous
        </Button>
        <Button onClick={() => setStep(step + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default CreateCoursePage;
