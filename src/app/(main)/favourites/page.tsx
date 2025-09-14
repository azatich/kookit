"use client"

import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import { getFavourites, getSessionUser } from "@/lib/helpers/api";
import { IRecipe } from "@/types/RecipeItem";
import { useEffect, useState } from "react"

export default function FavouritesPage() {
    const [favourites, setFavourites] = useState<IRecipe[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadFavourites() {
            setIsLoading(true);
            const data = await getFavourites();
            setFavourites(data);
            setIsLoading(false);
        }
        loadFavourites();
    }, [])

    const handleRecipeUnsave = (recipeId: string) => {
        setFavourites(prevFavourites =>
            prevFavourites.filter(recipe => recipe._id !== recipeId)
        );
    }

    return (
        <div className="bg-[#222222] min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col">
                <div className="w-full mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-pacifico text-[#FF7A00] mb-6 sm:mb-8 lg:mb-10 text-center">Favourites</h1>
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div key={i} className="bg-[#2f2f2f] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg animate-pulse">
                                    <div className="w-full h-40 sm:h-48 lg:h-56 bg-[#444]"></div>

                                    <div className="p-3 sm:p-4">
                                        {/* Title and bookmark skeleton */}
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <div className="flex-1">
                                                <div className="h-5 sm:h-6 bg-[#444] rounded mb-1"></div>
                                                <div className="h-4 sm:h-5 bg-[#444] rounded w-3/4"></div>
                                            </div>
                                            <div className="w-5 h-5 bg-[#444] rounded"></div>
                                        </div>

                                        {/* Rating skeleton */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <div key={star} className="w-3 h-3 bg-[#444] rounded"></div>
                                                ))}
                                            </div>
                                            <div className="h-3 w-8 bg-[#444] rounded"></div>
                                        </div>

                                        {/* Author & Date skeleton */}
                                        <div className="h-3 w-32 bg-[#444] rounded mb-2"></div>

                                        {/* Description skeleton */}
                                        <div className="space-y-1 mb-3">
                                            <div className="h-3 bg-[#444] rounded"></div>
                                            <div className="h-3 bg-[#444] rounded w-2/3"></div>
                                        </div>

                                        {/* Times skeleton */}
                                        <div className="flex justify-between">
                                            <div className="h-3 w-20 bg-[#444] rounded"></div>
                                            <div className="h-3 w-20 bg-[#444] rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : favourites.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                            {favourites.map((favourite) => (
                                <RecipeCard
                                    key={favourite._id}
                                    recipe={favourite}
                                    onUnsave={handleRecipeUnsave}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-lg mb-4">No favourites yet</div>
                            <p className="text-gray-500">Start saving recipes to see them here!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}