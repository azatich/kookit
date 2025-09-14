"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IRecipe } from "@/types/RecipeItem";
import { deleteRecipe, getSessionUser, getUser, saveRecipe, updateRecipeRating } from "@/lib/helpers/api";
import Rating from "./Rating";
import { useTranslations } from "next-intl";
import { BookmarkCheck } from "lucide-react";
import { FiBookmark } from "react-icons/fi";

const RecipeCard = ({ recipe, onUnsave }: { recipe: IRecipe; onUnsave?: (recipeId: string) => void }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [authorName, setAuthorName] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isLoadingIsSaved, setIsLoadingIsSaved] = useState<boolean>(false);
  const t = useTranslations('RecipesPage')
  const [currentRating, setCurrentRating] = useState<number>(() => {
    const ratings = recipe.rating;
    if (Array.isArray(ratings) && ratings.length > 0) {
      const valid = ratings.filter(([uid, r]) => uid !== "legacy" && (r || 0) > 0);
      if (valid.length === 0) return 0;
      const avg = valid.reduce((sum, [, r]) => sum + (r || 0), 0) / valid.length;
      return Math.round(avg);
    }
    return 0;
  });

  const handleSaveRecipe = async (recipeId: string) => {
    setIsLoadingIsSaved(true);
    if (isSaved) {
      await deleteRecipe(recipeId);
      setIsSaved(!isSaved);
      setIsLoadingIsSaved(false);
      // Notify parent component that recipe was unsaved
      if (onUnsave) {
        onUnsave(recipeId);
      }
      return;
    }
    await saveRecipe(recipeId);
    setIsSaved(!isSaved);
    setIsLoadingIsSaved(false);
  }

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getUser(recipe.authorId);
        setAuthorName(data.email);
      } catch (error) {
        console.log(error);
      }
    }
    loadUser();
  }, [recipe.authorId]);

  useEffect(() => {
    async function checkSavedRecipe() {
      setIsLoadingIsSaved(true);
      const session = await getSessionUser();
      const data = await getUser(session.userId);
      setIsSaved(data.savedRecipes.includes(recipe._id));
      setIsLoadingIsSaved(false);
    }
    checkSavedRecipe();
  }, [recipe._id])

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-[#2f2f2f] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/recipes/${recipe._id}`}>
        <div
          className={`relative w-full h-40 sm:h-48 lg:h-56 ${isHovered && "scale-105 transition duration-300"
            }`}
        >
          <Image
            src={recipe.imageURL || "/images/recipeThumbnail.png"}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-3 sm:p-4">
        {/* Title and Save button*/}
        <div className="flex justify-between items-start gap-2">
          <Link href={`/recipes/${recipe._id}`} className="flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-white hover:text-orange-400 transition line-clamp-2">
              {recipe.title}
            </h2>
          </Link>
          <button onClick={() => handleSaveRecipe(recipe._id)}>
            {isLoadingIsSaved ? <div className="text-orange-400 w-5 h-5 animate-spin border-2 border-orange-400 border-t-transparent rounded-full" /> : isSaved ? <BookmarkCheck className="text-orange-400" /> : <FiBookmark className="text-gray-400 w-6 h-6" />}
          </button>
        </div>

        {/* Rating */}
        <div className="mt-2 flex items-center">
          <Rating
            value={currentRating}
            onChange={async (val) => {
              setCurrentRating(val);
              try {
                const res = await updateRecipeRating(recipe._id, val);
                setCurrentRating(Math.round(res.average));
              } catch (err) {
                console.error(err);
              }
            }}
            size={14}
          />
          <span className="ml-2 text-xs sm:text-sm text-gray-400">{currentRating}/5</span>
        </div>

        {/* Author & Date */}
        <div className="text-xs sm:text-sm text-gray-400 mt-2 line-clamp-1">
          {t('By')} <span className="text-orange-400">{authorName || "Unknown"}</span>{" "}
          · {new Date(recipe.postedDate).toLocaleDateString()}
        </div>

        {/* Description (short) */}
        <p className="text-gray-300 text-xs sm:text-sm mt-2 sm:mt-3 line-clamp-2 sm:line-clamp-3">
          {recipe.description}
        </p>

        {/* Prep & Cook Times */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 mt-3 sm:mt-4 text-gray-300 text-xs sm:text-sm">
          <span className="flex items-center gap-1">
            <span>⏱</span>
            <span>{t('Prep')}: {recipe.prepTime} min</span>
          </span>
          <span className="flex items-center gap-1">
            <span>🔥</span>
            <span>{t('Cook')}: {recipe.cookTime} min</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
