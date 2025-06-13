//Hommepage
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { MoodCardGrid } from "@/components/MoodCardGrid";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted/30 px-4 py-12">
      <div className="max-w-2xl text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 bg-primary/10 px-4 py-2 rounded-full">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Employee Wellbeing Tracker</span>
        </div>
        <h1 className="text-5xl font-bold text-primary mb-4 leading-tight">
          How's Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Team Feeling</span> Today?
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Foster a happier workplace by understanding your team's emotions. 
          Simple, anonymous, and insightful mood tracking for better work environments.
        </p>
        <div className="flex gap-6 justify-center"> 
          <Link href="/mood">
            <Button size="lg" className="gap-2">
              <span>Share Your Mood</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </Button>
          </Link>
          <Link href="/admin">
            <Button size="lg" variant="secondary" className="gap-2">
              <span>Admin Dashboard</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
              </svg>
            </Button>
          </Link>
        </div>
      </div>
      
      
      <div className="w-full max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MoodCardGrid />
        </div>
      </div>
    </div>
  );
}