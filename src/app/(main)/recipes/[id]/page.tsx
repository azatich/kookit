"use client";

import { mockRecipesData } from "@/lib/mock/recipes";
import { useParams } from "next/navigation";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const RecipePage = () => {
  const { id } = useParams();
  const recipeId = parseInt(id as string, 10);

  const recipe = mockRecipesData.find((r) => r.id === recipeId);
  if (!recipe) {
    return <div className="text-white p-10">Recipe not found</div>;
  }

  return (
    <div className="bg-[#222222] min-h-screen text-white px-6 py-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <Link
          href="/recipes"
          className="inline-block mt-6 mb-4 px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition duration-300"
        >
          ← Back to Recipes
        </Link>{" "}
        <h1 className="text-4xl font-bold">{recipe.title}</h1>
        <p className="mt-2 text-gray-300">{recipe.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-400">
          <span>👨‍🍳 By {recipe.authorId}</span>
          <span>📅 {recipe.postedDate}</span>
          <span>⭐ {recipe.rating}/5</span>
        </div>
      </div>

      {/* Image */}
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

      {/* Times */}
      <div className="max-w-4xl mx-auto mt-6 flex gap-6 text-gray-300">
        <div>⏱️ Prep Time: {recipe.prepTime}</div>
        <div>🍳 Cook Time: {recipe.cookTime}</div>
      </div>

      {/* Ingredients */}
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        <ul className="list-disc list-inside space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
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
