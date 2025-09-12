import { getSession } from "@/lib/auth";
import Recipe from "@/models/Recipe";
import { NextResponse } from "next/server";

// Type definitions for rating system
type RatingEntry = [string, number];
type LegacyRating = number;
type RatingValue = RatingEntry | LegacyRating;

interface RecipeWithRating extends Document {
  rating?: RatingValue[];
  markModified?: (field: string) => void;
  save: () => Promise<RecipeWithRating>;
}

interface RatingResponse {
  ok: boolean;
  ratingPairs: RatingEntry[];
  average: number;
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse<RatingResponse | { error: string }>> {
  const { id } = await params;
  const { rating } = await req.json() as { rating: number };
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const recipe = await Recipe.findById(id) as RecipeWithRating | null;
  if (!recipe) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const userId = user.userId as string;
  const next = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
  const existing = Array.isArray(recipe.rating) ? recipe.rating : [];
  const normalized: RatingEntry[] = existing.map((entry: RatingValue): RatingEntry => {
    if (Array.isArray(entry)) {
      const uid = String(entry[0] ?? "");
      const val = Number(entry[1] ?? 0) || 0;
      return [uid, Math.max(0, Math.min(5, Math.round(val)))];
    }
    const val = Number(entry ?? 0) || 0;
    return ["legacy", Math.max(0, Math.min(5, Math.round(val)))];
  });
  
  const nextPairs: RatingEntry[] = [...normalized];
  const idx = nextPairs.findIndex((pair) => pair[0] === userId);
  if (idx >= 0) {
    nextPairs[idx][1] = next;
  } else {
    nextPairs.push([userId, next]);
  }

  recipe.rating = nextPairs;
  if (recipe.markModified) {
    recipe.markModified('rating');
  }

  await recipe.save();
  const filtered = nextPairs.filter(([uid, r]) => uid !== "legacy" && (r || 0) > 0);
  const avg = filtered.length
    ? filtered.reduce((sum: number, [, r]: [string, number]) => sum + (r || 0), 0) / filtered.length
    : 0;
  
  return NextResponse.json({ ok: true, ratingPairs: nextPairs, average: avg });
}