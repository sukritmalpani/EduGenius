// Sidebar.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { navList } from "../_constants/navList";
import WordRotate from "@/components/ui/word-rotate";

const Sidebar = () => {
  const path = usePathname();

  return (
    <div className="fixed h-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300 ease-in-out">
      <div className="p-6">
        <WordRotate
          className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent text-center"
          words={["AI", "Course", "Generator"]}
        />
      </div>

      <div className="px-3">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent my-4"></div>
      </div>

      <nav className="px-3 py-2">
        <ul className="space-y-1">
          {navList.map((item) => (
            <li key={item.id}>
              <Link href={item.route}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    item.route === path
                      ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <div className={`text-xl ${item.route === path ? "text-indigo-600 dark:text-indigo-400" : ""}`}>
                    <item.icon />
                  </div>
                  <span>{item.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
