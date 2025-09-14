import { getSession } from "@/lib/auth";
import connectDb from "@/lib/db";
import Recipe from "@/models/Recipe";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectDb();

        const session = await getSession();
        const recipes = [];

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findById(session.userId);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const favourites = user.savedRecipes;

        for (const favourite of favourites) {
            const recipe = await Recipe.findById(favourite);
            if (recipe) {
                recipes.push(recipe);
            }
        }
        return NextResponse.json(recipes, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch user favourites" },
            { status: 500 }
        );
    }
}