"use client";

import BackgroundCookingIcons from "@/components/BackgroundCookingIcons";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import { getRecipes } from "@/lib/helpers/api";
import { IRecipe } from "@/types/RecipeItem";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RecipePage = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadRecipes() {
      try {
        setIsLoading(true);
        const data = await getRecipes();
        setRecipes(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] relative overflow-hidden">
      {/* Background Cooking Icons */}
      {/* <BackgroundCookingIcons /> */}

      <Navbar />

      <div className="max-w-7xl mx-auto p-4 relative z-10">
        <h1 className="text-4xl font-pacifico text-[#FF7A00] mb-10 text-center">
          Explore Recipes
        </h1>

        <Link
          href="/recipes/add-recipe"
          className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 my-6 rounded-2xl text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 border-2 border-orange-400/20 hover:border-orange-300/40"
        >
          <div className="relative">
            <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">
              👨‍🍳
            </span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <span className="font-pacifico text-xl">Share Your Recipe</span>
          <div className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </Link>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-[#444] rounded-lg p-4 animate-pulse">
                <div className="h-48 bg-[#666] rounded-lg mb-4"></div>
                <div className="h-6 bg-[#666] rounded mb-2"></div>
                <div className="h-4 bg-[#666] rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipePage;
