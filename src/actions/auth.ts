'use server'

import { checkPasswordWithConfirmPassword, createJWT, hashPassword, verifyPassword } from "@/lib/auth";
import User from "@/models/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    redirect("/signup?error=email-exists");
  }
  if (!checkPasswordWithConfirmPassword(password, confirmPassword)) {
    redirect("/signup?error=password-mismatch");
  }

  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    email,
    password: hashedPassword,
  });
  const token = await createJWT(email, user._id.toString());
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  redirect("/");
};

export const loginAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    redirect("/login?error=Invalid-credentials");
  }
  const isValid = await verifyPassword(password, existingUser.password);
  if (!isValid) {
    redirect('/login?error=Invalid-credentials')
  }

  const token = await createJWT(email, existingUser._id.toString());
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  redirect("/");
};


export const logoutAction = async () => {
    const cookieStore = await cookies()
    cookieStore.delete('token')
}