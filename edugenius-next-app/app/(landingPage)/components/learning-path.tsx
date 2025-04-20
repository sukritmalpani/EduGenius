"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function LearningPath() {
  const paths = [
    {
      title: "Data Science Path",
      steps: [
        "Python Fundamentals",
        "Data Analysis",
        "Machine Learning",
        "Deep Learning",
        "Career Projects",
      ],
      color: "from-[#007BFF] to-[#00FFFF]",
    },
    {
      title: "Web Development Path",
      steps: [
        "HTML & CSS",
        "JavaScript",
        "React",
        "Backend Development",
        "Full-Stack Projects",
      ],
      color: "from-[#8A2BE2] to-[#00FFFF]",
    },
    {
      title: "AI Engineering Path",
      steps: [
        "Programming Basics",
        "ML Fundamentals",
        "Neural Networks",
        "NLP & Computer Vision",
        "AI Systems Design",
      ],
      color: "from-[#00FFFF] to-[#8A2BE2]",
    },
  ];

  return (
    <section className="py-20 relative bg-[#1A1A2E]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#007BFF] mb-4"
          >
            Personalized Learning Paths
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[#A1A1C1] max-w-2xl mx-auto"
          >
            Follow structured learning journeys designed to take you from
            beginner to professional.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paths.map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-lg transition-transform transform hover:scale-105"
            >
              <div
                className={`h-2 w-full bg-gradient-to-r ${path.color}`}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#00FFFF] mb-6">
                  {path.title}
                </h3>
                <ul className="space-y-4">
                  {path.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        <CheckCircle2 className="h-5 w-5 text-[#8A2BE2]" />
                      </div>
                      <div className="text-[#A1A1C1]">{step}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
