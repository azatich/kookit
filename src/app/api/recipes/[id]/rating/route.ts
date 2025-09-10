import { getSession } from "@/lib/auth";
import Recipe from "@/models/Recipe";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { rating } = await req.json() as { rating: number };
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const recipe = await Recipe.findById(id);
  if (!recipe) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const userId = user.userId as string;
  const next = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
  const existing = Array.isArray((recipe as any).rating) ? (recipe as any).rating : [];
  const normalized: [string, number][] = existing.map((entry: any) => {
    if (Array.isArray(entry)) {
      const uid = String(entry[0] ?? "");
      const val = Number(entry[1] ?? 0) || 0;
      return [uid, Math.max(0, Math.min(5, Math.round(val)))];
    }
    const val = Number(entry ?? 0) || 0;
    return ["legacy", Math.max(0, Math.min(5, Math.round(val)))];
  });
  const nextPairs: [string, number][] = [...normalized];
  const idx = nextPairs.findIndex((pair) => pair[0] === userId);
  if (idx >= 0) nextPairs[idx][1] = next;
  else nextPairs.push([userId, next]);

  (recipe as any).rating = nextPairs as any;
  (recipe as any).markModified && (recipe as any).markModified('rating');

  await recipe.save();
  const filtered = nextPairs.filter(([uid, r]) => uid !== "legacy" && (r || 0) > 0);
  const avg = filtered.length
    ? filtered.reduce((sum: number, [, r]: [string, number]) => sum + (r || 0), 0) / filtered.length
    : 0;
  return NextResponse.json({ ok: true, ratingPairs: nextPairs, average: avg });
}