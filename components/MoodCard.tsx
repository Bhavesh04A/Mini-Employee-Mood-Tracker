interface MoodCardProps {
  emoji: string;
  title: string;
  description: string;
  className?: string;
}

export function MoodCard({ emoji, title, description, className }: MoodCardProps) {
  return (
    <div className={`bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all flex  flex-col items-center text-center hover:scale-[1.02] ${className}`}>
      <div className="text-5xl mb-4" role="img" aria-label={title}>
        {emoji}
      </div>
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm md:text-base">{description}</p>
    </div>
  );
}