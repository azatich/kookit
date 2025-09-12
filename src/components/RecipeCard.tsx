"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { IRecipe } from "@/types/RecipeItem";
import { getUser, updateRecipeRating } from "@/lib/helpers/api";
import Rating from "./Rating";
import { useTranslations } from "next-intl";

const RecipeCard = ({ recipe }: { recipe: IRecipe }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [authorName, setAuthorName] = useState<string>("");
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

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-[#2f2f2f] rounded-2xl overflow-hidden shadow-lg"
    >
      <Link href={`/recipes/${recipe._id}`}>
        <div
          className={`relative w-full h-56 ${
            isHovered && "scale-105 transition duration-300"
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

      <div className="p-4">
        {/* Title */}
        <Link href={`/recipes/${recipe._id}`}>
          <h2 className="text-xl font-bold text-white hover:text-orange-400 transition">
            {recipe.title}
          </h2>
        </Link>

        {/* Rating */}
        <div className="mt-2">
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
            size={16}
          />
          <span className="ml-2 text-sm text-gray-400">{currentRating}/5</span>
        </div>

        {/* Author & Date */}
        <div className="text-sm text-gray-400 mt-2">
          {t('By')} <span className="text-orange-400">{authorName || "Unknown"}</span>{" "}
          · {new Date(recipe.postedDate).toLocaleDateString()}
        </div>

        {/* Description (short) */}
        <p className="text-gray-300 text-sm mt-3 line-clamp-3">
          {recipe.description}
        </p>

        {/* Prep & Cook Times */}
        <div className="flex justify-between mt-4 text-gray-300 text-sm">
          <span>⏱ {t('Prep')}: {recipe.prepTime} min</span>
          <span>🔥 {t('Cook')}: {recipe.cookTime} min</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
