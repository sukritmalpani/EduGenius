import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <Image
            src="/logo.png"
            alt="AI Course Generator"
            width={150}
            height={100}
            priority
            className="object-contain h-10 w-auto"
          />
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            Help
          </Button>
          <Button variant="ghost" size="sm" className="hidden md:flex">
            Docs
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            Feedback
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
            Get Started
          </Button>
          {/* User profile button would go here */}
        </div>
      </div>
    </header>
  );
};

export default Header;
