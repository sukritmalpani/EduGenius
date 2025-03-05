"use client";

import { motion } from "framer-motion";
import {
  Brain,
  BookOpen,
  MessageSquare,
  BarChart,
  Clock,
  Zap,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Brain className="h-10 w-10 text-[#00FFFF]" />,
      title: "Adaptive Learning",
      description:
        "AI-powered courses that adapt to your learning style and pace",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-[#00FFFF]" />,
      title: "24/7 AI Tutoring",
      description: "Get help anytime with our intelligent AI tutoring system",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-[#00FFFF]" />,
      title: "Rich Content Library",
      description:
        "Access thousands of interactive lessons across all subjects",
    },
    {
      icon: <BarChart className="h-10 w-10 text-[#00FFFF]" />,
      title: "Progress Tracking",
      description: "Detailed analytics to monitor your learning journey",
    },
    {
      icon: <Clock className="h-10 w-10 text-[#00FFFF]" />,
      title: "Spaced Repetition",
      description: "Scientifically proven methods to improve retention",
    },
    {
      icon: <Zap className="h-10 w-10 text-[#00FFFF]" />,
      title: "Instant Feedback",
      description: "Real-time assessment and personalized feedback",
    },
  ];

  return (
    <section className="py-20 bg-[#1A1A2E] text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#00FFFF] mb-4"
          >
            Supercharge Your Learning
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Our AI-powered platform offers innovative tools to make learning
            more effective and engaging.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#2C3E50] border border-[#8A2BE2] shadow-lg rounded-xl p-6 hover:border-[#00FFFF] transition-all"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-[#00FFFF] mb-2 group-hover:text-[#8A2BE2] transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
