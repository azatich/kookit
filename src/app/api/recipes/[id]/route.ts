import { getSession } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import connectDb from "@/lib/db";
import Recipe from "@/models/Recipe";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDb();

    const { id } = await context.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch recipe" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDb();

    const { id } = await context.params;

    const session = await getSession();
    if (!session) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }

    const recipe = await Recipe.findById(id);
    if (recipe.authorId.toString() !== session.userId) {
      return NextResponse.json({error: 'you can only delete your own recipes'})
    }

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    if (recipe.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(recipe.imagePublicId);
      } catch (error) {
        console.log("Failed to delete image from cloudinary: ", error);
      }
    }

    await Recipe.findByIdAndDelete(id); 

    return NextResponse.json(
      { message: "Recipe and image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete recipe" },
      { status: 500 }
    );
  }
}
