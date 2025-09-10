import { getSession } from "@/lib/auth";
import connectDb from "@/lib/db";
import Recipe from "@/models/Recipe";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        await connectDb();
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { id } = await context.params;
        const recipes = await Recipe.find({ authorId: id });
        return NextResponse.json(recipes, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch user recipes" },
            { status: 500 }
        );
    }
}