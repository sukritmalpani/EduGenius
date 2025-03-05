"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Medical Student",
      image: "/placeholder-user.jpg",
      content:
        "EduGenius transformed my study habits. The AI tutor helped me understand complex medical concepts that I was struggling with for months.",
      stars: 5,
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      image: "/placeholder-user.jpg",
      content:
        "Learning new programming languages has never been easier. The adaptive courses adjust to my skill level and the 24/7 AI assistance is invaluable.",
      stars: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "High School Teacher",
      image: "/placeholder-user.jpg",
      content:
        "I recommend EduGenius to all my students. It's like having a personal tutor for every subject, available anytime they need help.",
      stars: 4,
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
            What Our Students Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[#A1A1C1] max-w-2xl mx-auto"
          >
            Join thousands of satisfied learners who have transformed their
            education with EduGenius.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg transform hover:scale-105 transition-transform"
            >
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-4 border border-[#8A2BE2] shadow-md">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback className="bg-[#8A2BE2] text-white">
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-[#00FFFF] font-medium">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#A1A1C1] text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.stars
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[#A1A1C1]">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
