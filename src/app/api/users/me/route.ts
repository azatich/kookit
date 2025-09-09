import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import User from "@/models/User";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    await connectDb();

    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(session.userId).select("-password"); 
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to get current user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
