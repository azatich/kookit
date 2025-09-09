'use client'

import { RecipeItem } from "@/types/RecipeItem";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import React, { useState } from "react";

const RecipeCard = ({ recipe }: { recipe: RecipeItem }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="bg-[#2f2f2f] rounded-2xl overflow-hidden shadow-lg">
      <Link href={`/recipes/${recipe.id}`}>
        <div className={`relative w-full h-56 ${isHovered && "scale-105 transition duration-300"}`}>
          <Image
            src={recipe.imageURL}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-4">
        {/* Title */}
        <Link href={`/recipes/${recipe.id}`}>
          <h2 className="text-xl font-bold text-white hover:text-orange-400 transition">
            {recipe.title}
          </h2>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2 text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < recipe.rating ? "fill-yellow-400" : ""}
            />
          ))}
          <span className="ml-2 text-sm text-gray-400">{recipe.rating}/5</span>
        </div>

        {/* Author & Date */}
        <div className="text-sm text-gray-400 mt-2">
          By <span className="text-orange-400">{recipe.authorId}</span> ·{" "}
          {recipe.postedDate}
        </div>

        {/* Description (short) */}
        <p className="text-gray-300 text-sm mt-3 line-clamp-3">
          {recipe.description}
        </p>

        {/* Prep & Cook Times */}
        <div className="flex justify-between mt-4 text-gray-300 text-sm">
          <span>⏱ Prep: {recipe.prepTime}</span>
          <span>🔥 Cook: {recipe.cookTime}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
