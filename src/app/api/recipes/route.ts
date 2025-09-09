import { getSession } from "@/lib/auth";
import connectDb from "@/lib/db";
import Recipe from "@/models/Recipe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectDb()
        const session = await getSession();
        if (!session) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401})
        }
        const body = await req.json();
        const recipe = await Recipe.create({
            ...body,
            authorId: session.userId,
            postedDate: new Date(),
        })
        return NextResponse.json(recipe, {status: 201})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Failed to add recipe'}, {status: 500})
    }
}

