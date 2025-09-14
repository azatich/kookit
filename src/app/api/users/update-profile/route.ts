import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import User from "@/models/User";
import { getSession } from "@/lib/auth";

interface UpdateProfileData {
  name?: string;
  phone?: string;
  profileImage?: string;
  profileImagePublicId?: string;
}

export async function PUT(req: Request) {
  try {
    await connectDb();

    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone, profileImage, profileImagePublicId } = body as UpdateProfileData;

    const updateData: UpdateProfileData = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (profileImage !== undefined) updateData.profileImage = profileImage;
    if (profileImagePublicId !== undefined) updateData.profileImagePublicId = profileImagePublicId;

    const user = await User.findByIdAndUpdate(
      session.userId,
      updateData,
      { new: true, select: "-password" }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        userId: user._id.toString(),
        email: user.email,
        name: user.name || "",
        phone: user.phone || "",
        profileImage: user.profileImage || "",
        profileImagePublicId: user.profileImagePublicId || "",
        savedRecipes: user.savedRecipes || [],
        createdAt: user.createdAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update user profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
