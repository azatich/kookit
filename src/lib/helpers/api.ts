import { SessionUser } from "@/types/SessionUser";

export async function getUser(userId: string) {
  const res = await fetch(`/api/users/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function getSessionUser(): Promise<SessionUser> {
  const res = await fetch(`/api/users/me`);
  if (!res.ok) throw new Error("Failed to fetch session user");
  return res.json();
}

export async function getRecipes() {
  const res = await fetch("/api/recipes");
  if (!res.ok) throw new Error("Failed to fetch recipes");
  return res.json();
}

export async function getRecipeById(recipeId: string) {
  const res = await fetch(`/api/recipes/${recipeId}`);
  if (!res.ok) throw new Error("Failed to fetch recipe");
  return res.json();
}
