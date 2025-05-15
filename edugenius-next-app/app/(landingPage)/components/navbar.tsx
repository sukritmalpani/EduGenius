"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Lightbulb, Menu, User, Settings, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();
  console.log("User:", user);
  console.log("Is Authenticated:", isAuthenticated);
  console.log("Is Loading:", isLoading);
  console.log("Menu Open:", menuOpen);
  console.log("Kinde Client:", useKindeBrowserClient());
  console.log("Kinde Client User:", user);
  console.log("Kinde Client Authenticated:", isAuthenticated);
  console.log("Kinde Client Loading:", isLoading);
  console.log("Menu Open State:", menuOpen);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex items-center justify-between px-6 py-4 bg-[#1A1A2E] border-b border-[#2C3E50] shadow-md"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <Lightbulb className="w-8 h-8 text-[#8A2BE2]" />
        <span className="text-[#00FFFF] font-semibold text-xl">EduGenius</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <NavLink href="/course-dashboard">AI Courses</NavLink>
        <NavLink href="/dashboard">AI Resume</NavLink>
        <NavLink href="/mock/dashboard">Mock Interview</NavLink>
        <NavLink href="/path">Learning Path</NavLink>
        <NavLink href="/events">Events</NavLink>
      </div>

      {/* User Authentication & Profile */}
      <div className="hidden md:flex items-center space-x-4">
        {isLoading ? null : isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9 border border-[#8A2BE2]">
                  <AvatarImage
                    src={user?.picture || "/default-avatar.png"}
                    alt="Profile"
                  />
                  <AvatarFallback className="bg-[#8A2BE2] text-white">
                    {user?.given_name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-[#1A1A2E] shadow-lg border border-[#2C3E50]"
            >
              <div className="p-3">
                <p className="font-semibold text-[#00FFFF]">
                  {user?.given_name || "User"}
                </p>
                <p className="text-sm text-gray-400">
                  {user?.email || "No email"}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-gray-300 hover:text-[#00FFFF]">
                <User className="mr-2 h-4 w-4 text-gray-400" />
                <span>My Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-gray-300 hover:text-[#00FFFF]">
                <Settings className="mr-2 h-4 w-4 text-gray-400" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <LogoutLink>
                <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </LogoutLink>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <LoginLink>
              <Button
                variant="outline"
                className="text-white border-[#8A2BE2] hover:border-[#00FFFF]"
              >
                Sign In
              </Button>
            </LoginLink>
            <RegisterLink>
              <Button className="bg-[#007BFF] hover:bg-[#0056b3] text-white">
                Start Learning
              </Button>
            </RegisterLink>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#1A1A2E] shadow-md border-t border-[#2C3E50] md:hidden">
          <div className="flex flex-col space-y-4 py-4 px-6">
            <NavLink href="/course-dashboard">AI Courses</NavLink>
            <NavLink href="/dashboard">AI Resume</NavLink>
            <NavLink href="/mock/dashboard">Mock Interview</NavLink>
            <NavLink href="/path">Learning Path</NavLink>
            <NavLink href="/events">Events</NavLink>
          </div>

          <div className="flex flex-col items-center space-y-3 py-4 border-t border-[#2C3E50]">
            {isAuthenticated ? (
              <>
                <p className="text-[#00FFFF]">{user?.given_name}</p>
                <LogoutLink>
                  <Button className="text-red-500 border border-red-500 hover:bg-red-500/20">
                    Log out
                  </Button>
                </LogoutLink>
              </>
            ) : (
              <>
                <LoginLink>
                  <Button
                    variant="outline"
                    className="w-full text-white border-[#8A2BE2] hover:border-[#00FFFF]"
                  >
                    Sign In
                  </Button>
                </LoginLink>
                <RegisterLink>
                  <Button className="w-full bg-[#007BFF] hover:bg-[#0056b3] text-white">
                    Start Learning
                  </Button>
                </RegisterLink>
              </>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  );
}

/* Navigation Link Component */
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-[#00FFFF] transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00FFFF] transition-all group-hover:w-full" />
    </Link>
  );
}
