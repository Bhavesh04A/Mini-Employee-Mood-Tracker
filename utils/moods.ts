export type Mood = {
  id: string;
  name: string;
  value: "happy" | "neutral" | "sad";
  comment?: string;
  timestamp: number;
};

let moods: Mood[] = [];

export function getMoods() {
  return moods;
}

export function addMood(mood: Mood) {
  moods.push(mood);
}

export function deleteMood(id: string) {
  moods = moods.filter(m => m.id !== id);
}
