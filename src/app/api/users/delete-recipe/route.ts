import { getSession } from "@/lib/auth";
import connectDb from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    try {
        await connectDb();
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { recipeId } = await req.json();
        const user = await User.findById(session.userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        user.savedRecipes = user.savedRecipes.filter((id: string) => id !== recipeId);
        await user.save();
        return NextResponse.json({ message: "Recipe deleted successfully" }, { status: 200 });
    } catch (error) {   
        console.error(error);
        return NextResponse.json({ error: "Failed to delete recipe" }, { status: 500 });
    }
}