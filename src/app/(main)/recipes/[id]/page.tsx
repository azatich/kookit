"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getRecipeById, getSessionUser } from "@/lib/helpers/api";
import { IRecipe } from "@/types/RecipeItem";
import { SessionUser } from "@/types/SessionUser";

const RecipePage = () => {
  const params = useParams();
  const id = params?.id as string;
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchRecipe();
  }, [id]);

  useEffect(() => {
    async function loadUser() {
      if (!recipe?.authorId) return;
      const data = await getSessionUser();
      setCurrentUser(data);
    }
    loadUser();
  }, [recipe?.authorId]);

  async function handleDeleteRecipe() {
    if (!recipe?._id) return;

    const res = await fetch(`/api/recipes/${recipe._id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      window.location.href = "/recipes";
    } else {
      throw new Error("Failed to delete recipe");
    }
  }

  if (loading) {
    return (
      <div className="text-white px-6 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Header skeleton */}
          <div className="flex justify-between items-center mb-6">
            <div className="h-10 w-32 bg-[#555] rounded-lg animate-pulse"></div>
            <div className="h-10 w-24 bg-[#555] rounded-lg animate-pulse"></div>
          </div>

          {/* Title skeleton */}
          <div className="h-12 w-3/4 bg-[#555] rounded-lg animate-pulse mb-4"></div>

          {/* Description skeleton */}
          <div className="h-6 w-full bg-[#555] rounded-lg animate-pulse mb-2"></div>
          <div className="h-6 w-2/3 bg-[#555] rounded-lg animate-pulse mb-6"></div>

          {/* Meta info skeleton */}
          <div className="flex gap-4 mb-6">
            <div className="h-5 w-32 bg-[#555] rounded animate-pulse"></div>
            <div className="h-5 w-24 bg-[#555] rounded animate-pulse"></div>
            <div className="h-5 w-16 bg-[#555] rounded animate-pulse"></div>
          </div>

          {/* Image skeleton */}
          <div className="w-full h-[400px] bg-[#555] rounded-lg animate-pulse mb-6"></div>

          {/* Times skeleton */}
          <div className="flex gap-6 mb-10">
            <div className="h-6 w-32 bg-[#555] rounded animate-pulse"></div>
            <div className="h-6 w-32 bg-[#555] rounded animate-pulse"></div>
          </div>

          {/* Ingredients skeleton */}
          <div className="mb-10">
            <div className="h-8 w-40 bg-[#555] rounded-lg animate-pulse mb-4"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-5 w-full bg-[#555] rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Directions skeleton */}
          <div>
            <div className="h-8 w-32 bg-[#555] rounded-lg animate-pulse mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-6 w-full bg-[#555] rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) return <div className="text-white p-10">Recipe not found</div>;  
  
  return (
    <div className="text-white px-6 py-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <Link
            href="/recipes"
            className="inline-block mt-6 mb-4 px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition duration-300"
          >
            ← Back to Recipes
          </Link>
          {currentUser && currentUser.userId === recipe.authorId && (
            <button
              onClick={handleDeleteRecipe}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
              type="submit"
            >
              Remove recipe
            </button>
          )}
        </div>
        <h1 className="text-4xl font-pacifico text-orange-400">
          {recipe.title}
        </h1>
        <p className="mt-2 text-gray-300">{recipe.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-400">
          {recipe.authorId && (
            <span>👨‍🍳 By {recipe.authorId}</span>
          )}
          {recipe.postedDate && (
            <span>📅 {new Date(recipe.postedDate).toLocaleDateString()}</span>
          )}
          {Array.isArray(recipe.rating) && recipe.rating.length > 0 && (() => {
            const valid = recipe.rating.filter(([uid, r]) => uid !== "legacy" && (r || 0) > 0);
            if (valid.length === 0) return null;
            const avg = valid.reduce((sum, [, r]) => sum + (r || 0), 0) / valid.length;
            return <span>⭐{avg.toFixed(1)}/5</span>;
          })()}
        </div>
      </div>

      {/* Image */}
      {recipe.imageURL && (
        <div className="max-w-4xl mx-auto mt-6">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <Image
              src={recipe.imageURL}
              alt={recipe.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Times */}
      <div className="max-w-4xl mx-auto mt-6 flex gap-6 text-gray-300">
        {recipe.prepTime && <div>⏱️ Prep Time: {recipe.prepTime}</div>}
        {recipe.cookTime && <div>🍳 Cook Time: {recipe.cookTime}</div>}
      </div>

      {/* Ingredients */}
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        <ul className="list-disc list-inside space-y-2">
          {recipe.ingredients.length === 1 ? (
            <li>{recipe.ingredients[0]}</li>
          ) : (
            recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))
          )}
        </ul>
      </div>

      {/* Directions */}
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4">Directions</h2>
        <ol className="list-decimal list-inside space-y-4">
          {recipe.directions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipePage;
