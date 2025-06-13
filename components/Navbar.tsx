"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center gap-x-4">
            <Link href="/" className="text-xl font-bold text-primary">
              MoodTracker
            </Link>

            
            <div className="hidden md:flex md:gap-x-8">
              <Link 
                href="/mood" 
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
              >
                Submit Mood
              </Link>
              <Link 
                href="/admin" 
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>

          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        
        {mobileMenuOpen && (
          <div className="md:hidden pb-2">
            <div className="flex flex-col space-y-1 px-2 pt-2">
              <Link 
                href="/mood" 
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Submit Mood
              </Link>
              <Link 
                href="/admin" 
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
