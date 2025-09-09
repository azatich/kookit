import { getSession } from "@/lib/auth";
import connectDb from "@/lib/db";
import Recipe from "@/models/Recipe";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    await connectDb();
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!body.title || !body.imageURL || !body.imagePublicId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let recipe;
    try {
      recipe = await Recipe.create({
        ...body,
        authorId: session.userId,
        postedDate: new Date(),
      });
    } catch (dbError) {
      console.error("❌ DB save failed:", dbError);

      if (body.imagePublicId) {
        await cloudinary.uploader.destroy(body.imagePublicId);
      }

      return NextResponse.json(
        { error: "Failed to save recipe" },
        { status: 500 }
      );
    }

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    console.error("❌ Recipe creation error:", error);
    return NextResponse.json(
      { error: "Failed to add recipe" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDb();
    const recipes = await Recipe.find().sort({ postedDate: -1 });
    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 200 }
    );
  }
}
