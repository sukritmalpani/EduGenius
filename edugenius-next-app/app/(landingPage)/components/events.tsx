"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";

export default function Events() {
  const events = [
    {
      title: "AI in Education Summit",
      date: "March 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Virtual Event",
      image: "/placeholder.svg?height=200&width=400",
      category: "Conference",
    },
    {
      title: "Machine Learning Workshop",
      date: "March 22, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Tech Hub, New York",
      image: "/placeholder.svg?height=200&width=400",
      category: "Workshop",
    },
    {
      title: "Career in AI Panel Discussion",
      date: "April 5, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Virtual Event",
      image: "/placeholder.svg?height=200&width=400",
      category: "Webinar",
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
            Upcoming Events
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Join our community events to learn, network, and grow your skills.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#2C3E50] border border-[#8A2BE2] shadow-lg rounded-xl overflow-hidden group hover:border-[#00FFFF] transition-all"
            >
              <div className="relative">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-4 right-4 bg-[#8A2BE2] text-white text-xs font-medium px-2 py-1 rounded">
                  {event.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#00FFFF] mb-4 group-hover:text-[#8A2BE2] transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-2 mb-6 text-gray-300">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-[#00FFFF]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-[#00FFFF]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-[#00FFFF]" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <Button className="w-full bg-[#007BFF] hover:bg-[#0056b3] text-white transition-all">
                  Register Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
