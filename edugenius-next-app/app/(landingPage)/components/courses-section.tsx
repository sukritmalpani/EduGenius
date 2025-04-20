"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  FileText,
  Video,
  MessageSquare,
  Brain,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

export default function CoursesSection() {
  const courses = [
    {
      icon: <Brain className="h-10 w-10 text-[#00FFFF]" />,
      title: "AI Course",
      description:
        "Master artificial intelligence fundamentals with hands-on projects.",
      color: "from-[#8A2BE2]/30 to-[#00FFFF]/30",
      link: "/courses/ai",
    },
    {
      icon: <FileText className="h-10 w-10 text-[#00FFFF]" />,
      title: "AI Resume Builder",
      description:
        "Create an ATS-optimized resume with AI-powered suggestions.",
      color: "from-[#00FFFF]/30 to-[#8A2BE2]/30",
      link: "/resume",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-[#00FFFF]" />,
      title: "AI Mock Interview",
      description: "Practice with our AI interviewer and get instant feedback.",
      color: "from-[#007BFF]/30 to-[#00FFFF]/30",
      link: "/interview",
    },
    {
      icon: <Video className="h-10 w-10 text-[#00FFFF]" />,
      title: "Virtual Meetings",
      description: "Connect with tutors and peers in our virtual classroom.",
      color: "from-[#8A2BE2]/30 to-[#007BFF]/30",
      link: "/meetings",
    },
    {
      icon: <Code className="h-10 w-10 text-[#00FFFF]" />,
      title: "AR Learning",
      description: "Experience augmented reality lessons for complex topics.",
      color: "from-[#00FFFF]/30 to-[#8A2BE2]/30",
      link: "/ar-learning",
    },
    {
      icon: <Briefcase className="h-10 w-10 text-[#00FFFF]" />,
      title: "Career Paths",
      description:
        "Personalized learning paths aligned with your career goals.",
      color: "from-[#007BFF]/30 to-[#8A2BE2]/30",
      link: "/learning-path",
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
            className="text-3xl md:text-4xl font-bold text-[#00FFFF] mb-4"
          >
            AI-Powered Learning Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Explore our comprehensive suite of AI tools designed to enhance your
            learning and career.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Background Hover Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${course.color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>

              {/* Card Content */}
              <div className="bg-[#2C3E50] backdrop-blur-md rounded-xl p-6 border border-[#2C3E50]/50 h-full relative z-10 group-hover:border-[#00FFFF]/50 transition-colors shadow-lg">
                <div className="mb-4">{course.icon}</div>
                <h3 className="text-xl font-semibold text-[#00FFFF] mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-300 mb-4">{course.description}</p>
                <Link
                  href={course.link}
                  className="inline-flex items-center text-[#8A2BE2] hover:text-[#6A0DAD] transition-colors font-medium"
                >
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
