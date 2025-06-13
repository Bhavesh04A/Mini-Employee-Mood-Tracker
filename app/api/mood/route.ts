import { NextRequest, NextResponse } from "next/server";
import { getMoods, addMood, deleteMood, Mood } from "@/utils/moods";

export async function GET() {
  return NextResponse.json(getMoods());
}

export async function POST(req: NextRequest) {
  const { name, value, comment } = await req.json();
  const newMood: Mood = {
    id: Date.now().toString(),
    name,
    value,
    comment,
    timestamp: Date.now(),
  };
  addMood(newMood);
  return NextResponse.json(newMood, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  deleteMood(id);
  return NextResponse.json({ success: true });
}
