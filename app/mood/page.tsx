//Page where employees can update their mood
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const moods = [
  { label: "Happy", emoji: "😄", value: "happy" },
  { label: "Neutral", emoji: "😐", value: "neutral" },
  { label: "Sad", emoji: "😞", value: "sad" },
];

type MoodSubmission = {
  id: string;
  name: string;
  value: "happy" | "neutral" | "sad";
  comment?: string;
  timestamp: number;
};

export default function MoodPage() {
  const [selected, setSelected] = useState("");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [allMoods, setAllMoods] = useState<MoodSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all moods when component mounts
  useEffect(() => {
    const fetchMoods = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/mood');
        const data = await response.json();
        setAllMoods(data);
      } catch (error) {
        console.error("Failed to fetch moods:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoods();
  }, []);

  // Filter moods by the current user's name
  const userMoods = name ? allMoods.filter(mood => mood.name === name) : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, value: selected, comment }),
      });
      const newMood = await response.json();
      setAllMoods(prev => [newMood, ...prev]);
      resetForm();
    } catch (error) {
      console.error("Failed to submit mood:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this mood entry?")) return;
    setIsLoading(true);
    try {
      await fetch('/api/mood', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setAllMoods(prev => prev.filter(mood => mood.id !== id));
    } catch (error) {
      console.error("Failed to delete mood:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function resetForm() {
    setSelected("");
    setComment("");
    // Keep the name for convenience
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-card border rounded-lg p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary">
              How are you feeling today?
            </h2>
            <p className="text-muted-foreground">
              Share your current mood with the team
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded bg-input text-foreground"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Your Mood</label>
                <div className="grid grid-cols-3 gap-2">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      type="button"
                      onClick={() => setSelected(mood.value)}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${
                        selected === mood.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      <span className="text-2xl">{mood.emoji}</span>
                      <span className="text-sm">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Comment (Optional)</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-2 border rounded bg-input text-foreground"
                  placeholder="Any additional thoughts?"
                  rows={3}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={!selected || !name || isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Mood"}
            </Button>
          </form>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-primary">Your Mood History</h3>
          
          {!name ? (
            <div className="bg-card border rounded-lg p-6 text-center text-muted-foreground">
              Enter your name above to see your mood history
            </div>
          ) : isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading mood history...
            </div>
          ) : userMoods.length === 0 ? (
            <div className="bg-card border rounded-lg p-6 text-center text-muted-foreground">
              No mood submissions yet for {name}
            </div>
          ) : (
            <div className="space-y-3">
              {userMoods.map((mood) => {
                const moodData = moods.find(m => m.value === mood.value);
                return (
                  <div key={mood.id} className="bg-card border rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{moodData?.emoji}</span>
                        <div>
                          <p className="font-medium">{moodData?.label}</p>
                          {mood.comment && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {mood.comment}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(mood.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(mood.id)}
                        disabled={isLoading}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}