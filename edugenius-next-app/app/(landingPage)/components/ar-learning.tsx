"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CuboidIcon as Cube, Smartphone, Glasses } from "lucide-react";
import Image from "next/image";

export default function ARLearning() {
  return (
    <section className="py-20 relative overflow-hidden bg-[#1A1A2E]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-block bg-[#00FFFF]/20 text-[#00FFFF] px-4 py-1 rounded-full text-sm font-medium mb-4">
              Revolutionary Learning
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#00FFFF] mb-6">
              Experience Education in Augmented Reality
            </h2>
            <p className="text-gray-300 mb-8">
              Our AR learning technology brings complex concepts to life.
              Visualize molecular structures, explore historical sites, and
              interact with 3D models to deepen your understanding.
            </p>

            <div className="space-y-4 mb-8">
              <FeatureItem
                icon={<Cube className="h-6 w-6 text-[#8A2BE2]" />}
                title="Interactive 3D Models"
                description="Manipulate and explore complex 3D objects from every angle."
              />
              <FeatureItem
                icon={<Smartphone className="h-6 w-6 text-[#8A2BE2]" />}
                title="Mobile Accessibility"
                description="Learn anywhere with our mobile AR applications."
              />
              <FeatureItem
                icon={<Glasses className="h-6 w-6 text-[#8A2BE2]" />}
                title="Immersive Experience"
                description="Fully immerse yourself in the learning material."
              />
            </div>

            <Button className="bg-[#007BFF] hover:bg-[#0056b3] text-white px-6 py-2 rounded-lg shadow-lg transition">
              Try AR Learning
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden border border-[#2C3E50]">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="AR Learning Experience"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-[#2C3E50]">
                  <p className="text-white font-medium">
                    Experience human anatomy in 3D
                  </p>
                  <p className="text-gray-300 text-sm">
                    Explore the circulatory system with interactive elements.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Glow Effects */}
            <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-[#00FFFF]/20 rounded-full blur-xl"></div>
            <div className="absolute -top-6 -left-6 h-24 w-24 bg-[#8A2BE2]/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* Feature Item Component */
function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 bg-[#8A2BE2]/20 p-2 rounded-lg mr-4">
        {icon}
      </div>
      <div>
        <h4 className="text-[#00FFFF] font-medium">{title}</h4>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
}
