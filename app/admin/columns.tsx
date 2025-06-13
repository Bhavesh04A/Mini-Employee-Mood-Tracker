import { ColumnDef } from "@tanstack/react-table";
import { Mood } from "@/utils/moods";

export const columns: ColumnDef<Mood>[] = [
  {
    accessorKey: "value",
    header: "Mood",
    cell: ({ getValue }) => {
      const v = getValue() as string;
      if (v === "happy") return <span className="text-2xl">😄</span>;
      if (v === "neutral") return <span className="text-2xl">😐</span>;
      if (v === "sad") return <span className="text-2xl">😞</span>;
      return v;
    },
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ getValue }) => <span className="truncate">{getValue() as string}</span>,
  },
  {
    accessorKey: "timestamp",
    header: "Time",
    cell: ({ getValue }) => (
      <span className="text-xs text-muted-foreground">
        {new Date(getValue() as number).toLocaleString()}
      </span>
    ),
  },
];
