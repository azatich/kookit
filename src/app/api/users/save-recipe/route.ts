import { getSession } from "@/lib/auth";
import connectDb from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: Request) {
    try {
        await connectDb();
        console.log("Database connection status:", mongoose.connection.readyState);
        const session = await getSession();
        console.log("Session:", session);
        
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const { recipeId } = await req.json();
        
        if (!recipeId) {
            return NextResponse.json({ error: "Recipe ID is required" }, { status: 400 });
        }
        
        const user = await User.findById(session.userId);
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        if (!user.savedRecipes) {
            user.savedRecipes = [];
        }
        
        if (!user.savedRecipes.includes(recipeId)) {
            user.savedRecipes.push(recipeId);
            await user.save();
        } else {
            console.log(`Recipe ${recipeId} already saved for user ${session.userId}`);
        }
        
        return NextResponse.json({ 
            message: "Recipe saved successfully", 
            savedRecipes: user.savedRecipes,
            totalSaved: user.savedRecipes.length 
        }, { status: 200 });
    } catch (error) {
        console.error("Error in save-recipe:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}