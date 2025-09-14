// USER ACTIONS

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

export async function getUserRecipes(userId: string) {
  const res = await fetch(`/api/recipes/user/${userId}`); // /api/recipes/user/665645645645645645645645
  if (!res.ok) throw new Error("Failed to fetch user recipes");
  return res.json();
}

export async function saveRecipe(recipeId: string) {
  const res = await fetch(`/api/users/save-recipe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipeId }),
  });
  if (!res.ok) throw new Error("Failed to save recipe");
  console.log('recipe is saved');
  
  return res.json();
}

export async function deleteRecipe(recipeId: string) {
  const res = await fetch(`/api/users/delete-recipe`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipeId }),
  });
  if (!res.ok) throw new Error("Failed to delete recipe");
  return res.json();
}

// RECIPE ACTIONS

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

export async function updateRecipeRating(recipeId: string, val: number) {
  const res = await fetch(`/api/recipes/${recipeId}/rating`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating: val }),
  });
  if (!res.ok) throw new Error("Failed to update rating");
  return res.json() as Promise<{ ok: true; ratingPairs: [string, number][]; average: number }>;
}
