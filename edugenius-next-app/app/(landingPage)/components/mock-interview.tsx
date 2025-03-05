"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, Video, FileText, BarChart } from "lucide-react";
import Image from "next/image";

export default function MockInterview() {
  const features = [
    {
      icon: <Video className="h-6 w-6 text-purple-500" />,
      title: "Video Interviews",
      description:
        "Practice with our AI interviewer in a realistic video setting",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-purple-500" />,
      title: "Real-time Feedback",
      description:
        "Get instant analysis on your responses, body language, and tone",
    },
    {
      icon: <FileText className="h-6 w-6 text-purple-500" />,
      title: "Industry Questions",
      description: "Practice with questions tailored to your specific industry",
    },
    {
      icon: <BarChart className="h-6 w-6 text-purple-500" />,
      title: "Performance Analytics",
      description: "Track your improvement over time with detailed metrics",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="inline-block bg-purple-500/20 text-purple-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Interview Preparation
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Master Your Job Interviews with AI
            </h2>
            <p className="text-gray-400 mb-8">
              Our AI-powered mock interview system helps you prepare for job
              interviews with realistic scenarios, instant feedback, and
              personalized coaching.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 bg-purple-500/20 p-2 rounded-lg mr-4">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{feature.title}</h4>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Schedule Mock Interview
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden border border-white/10">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="AI Mock Interview"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium">AI Interviewer</p>
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Tell me about a time when you faced a challenge at work and
                    how you overcame it.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
