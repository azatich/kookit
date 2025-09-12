"use client";

import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import { getRecipes } from "@/lib/helpers/api";
import { IRecipe } from "@/types/RecipeItem";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RecipePage = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const t = useTranslations('RecipesPage')

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

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-pacifico text-[#FF7A00] mb-6 sm:mb-8 lg:mb-10 text-center">
          {t('ExploreRecipes')}
        </h1>

        <div className="flex justify-center mb-6 sm:mb-8">
          <Link
            href="/recipes/add-recipe"
            className="group relative inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-orange-500 to-amber-500 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-white font-semibold text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 border-2 border-orange-400/20 hover:border-orange-300/40"
          >
            <div className="relative">
              <span className="text-lg sm:text-xl lg:text-2xl group-hover:rotate-12 transition-transform duration-300">
                👨‍🍳
              </span>
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <span className="font-pacifico text-sm sm:text-base lg:text-xl whitespace-nowrap">{t('ShareYourRecipe')}</span>
            <div className="ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
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
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-[#444] rounded-lg sm:rounded-xl p-3 sm:p-4 animate-pulse">
                <div className="h-32 sm:h-40 lg:h-48 bg-[#666] rounded-lg mb-3 sm:mb-4"></div>
                <div className="h-4 sm:h-5 lg:h-6 bg-[#666] rounded mb-2"></div>
                <div className="h-3 sm:h-4 bg-[#666] rounded w-3/4 mb-2"></div>
                <div className="h-3 sm:h-4 bg-[#666] rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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
