import ARLearning from "./components/ar-learning";
import CoursesSection from "./components/courses-section";
import Events from "./components/events";
import Features from "./components/features";
import Footer from "./components/footer";
import Hero from "./components/hero";
import LearningPath from "./components/learning-path";
import Navbar from "./components/navbar";
import { SparklesCore } from "./components/sparkles";
import Testimonials from "./components/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1A1A2E] antialiased relative overflow-hidden">
      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#00FFFF"
        />
      </div>

      <div className="relative z-10">
        <Hero />
        <Features />
        <CoursesSection />
        <LearningPath />
        <ARLearning />
        <Events />
        <Testimonials />
        <Footer />
      </div>
    </main>
  );
}
