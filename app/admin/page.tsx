//Admin dashboard where admin can see all the updated moods
"use client";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Mood = {
  id: string;
  name: string;
  value: "happy" | "neutral" | "sad";
  comment?: string;
  timestamp: number;
};

const moodsList = [
  { label: "Happy", value: "happy", emoji: "😄" },
  { label: "Neutral", value: "neutral", emoji: "😐" },
  { label: "Sad", value: "sad", emoji: "😞" },
];

export default function AdminPage() {
  const [data, setData] = useState<Mood[]>([]);
  const [search, setSearch] = useState("");
  const [filterMood, setFilterMood] = useState("");

  const fetchData = () =>
    fetch("/api/mood")
      .then(res => res.json())
      .then(setData);

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this mood entry?")) return;
    await fetch("/api/mood", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchData();
  }

  const filtered = data.filter((m) => {
    const matchesMood = filterMood ? m.value === filterMood : true;
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      (m.comment || "").toLowerCase().includes(search.toLowerCase());
    return matchesMood && matchesSearch;
  });

  
  const happyCount = data.filter(m => m.value === 'happy').length;
  const neutralCount = data.filter(m => m.value === 'neutral').length;
  const sadCount = data.filter(m => m.value === 'sad').length;
  const totalCount = data.length;

  return (
    <div className="min-h-screen px-4 py-8 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-primary">Mood Dashboard</h1>
        <p className="text-muted-foreground">
          View and manage team mood submissions
        </p>
      </div>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border">
          <p className="text-sm text-muted-foreground">Total Submissions</p>
          <p className="text-2xl font-bold">{totalCount}</p>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <p className="text-sm text-muted-foreground">Happy</p>
          <p className="text-2xl font-bold">{happyCount}</p>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <p className="text-sm text-muted-foreground">Neutral</p>
          <p className="text-2xl font-bold">{neutralCount}</p>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <p className="text-sm text-muted-foreground">Sad</p>
          <p className="text-2xl font-bold">{sadCount}</p>
        </div>
      </div>

      
      <div className="bg-card p-4 rounded-lg border space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Search</label>
            <input
              type="text"
              placeholder="Search by name or comment"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-2 border rounded bg-input text-foreground"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Filter by Mood</label>
            <select
              value={filterMood}
              onChange={e => setFilterMood(e.target.value)}
              className="w-full px-4 py-2 border rounded bg-input text-foreground"
            >
              <option value="">All Moods</option>
              {moodsList.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button
              variant="secondary"
              onClick={() => { setSearch(""); setFilterMood(""); }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      
      <div className="rounded-lg border bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Mood</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead className="w-[180px]">Time</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No matching mood submissions found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map(mood => {
                const moodData = moodsList.find(m => m.value === mood.value);
                return (
                  <TableRow key={mood.id}>
                    <TableCell className="font-medium">{mood.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{moodData?.emoji}</span>
                        <span>{moodData?.label}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {mood.comment || (
                        <span className="text-muted-foreground">No comment</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(mood.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(mood.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}