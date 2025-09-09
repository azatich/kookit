import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import { mockRecipesData } from "@/lib/mock/recipes";
import Link from "next/link";
import React from "react";

const RecipePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-orange-500 mb-10 text-center">
          Explore Recipes
        </h1>

        <Link href='/recipes/add-recipe' className="inline-block bg-[#ffa500] px-4 py-2 my-4 rounded-lg text-white hover:bg-amber-600 transition duration-300">Add your recipe 🙂</Link>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {mockRecipesData.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
