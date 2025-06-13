import { MoodCard } from "./MoodCard";

export function MoodCardGrid() {
  const moodData = [
    {
      emoji: "😊",
      title: "Positive Moods",
      description: "Track happy moments and celebrate wins"
    },
    {
      emoji: "😐",
      title: "Neutral Moods",
      description: "Monitor baseline emotions"
    },
    {
      emoji: "😔",
      title: "Negative Moods",
      description: "Identify areas needing improvement"
    }
  ];

  return (
    <div className="flex flex-row flex-wrap justify-center gap-6 p-4">
      {moodData.map((mood, index) => (
        <MoodCard
          key={index}
          emoji={mood.emoji}
          title={mood.title}
          description={mood.description}
          className="flex-1 min-w-[250px] max-w-[300px]"
        />
      ))}
    </div>
  );
}