"use client"

import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import { getUserRecipes, getSessionUser } from "@/lib/helpers/api";
import { IRecipe } from "@/types/RecipeItem";
import { SessionUser } from "@/types/SessionUser";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { PlusCircle, ChefHat, TrendingUp, Calendar } from "lucide-react";

export default function YourPostsPage() {
    const [userRecipes, setUserRecipes] = useState<IRecipe[]>([]);
    const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const t = useTranslations('YourPostsPage');

    useEffect(() => {
        async function loadUserRecipes() {
            try {
                setIsLoading(true);
                const sessionUser = await getSessionUser();
                setCurrentUser(sessionUser);

                if (sessionUser.userId) {
                    const recipes = await getUserRecipes(sessionUser.userId);
                    setUserRecipes(recipes);
                }
            } catch (error) {
                console.error("Error loading user recipes:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadUserRecipes();
    }, []);

    const handleRecipeDelete = (recipeId: string) => {
        setUserRecipes(prevRecipes =>
            prevRecipes.filter(recipe => recipe._id !== recipeId)
        );
    };

    // Calculate stats
    const totalRecipes = userRecipes.length;
    // const totalViews = userRecipes.reduce((sum, recipe) => sum + (recipe.views || 0), 0);
    const averageRating = userRecipes.length > 0
        ? userRecipes.reduce((sum, recipe) => {
            if (Array.isArray(recipe.rating) && recipe.rating.length > 0) {
                const valid = recipe.rating.filter(([uid, r]) => uid !== "legacy" && (r || 0) > 0);
                if (valid.length > 0) {
                    const avg = valid.reduce((s, [, r]) => s + (r || 0), 0) / valid.length;
                    return sum + avg;
                }
            }
            return sum;
        }, 0) / userRecipes.length
        : 0;

    return (
        <div className="bg-[#222222] min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col">
                <div className="max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-pacifico text-[#FF7A00] mb-4">
                            {t('YourRecipeCollection')} 👨‍🍳
                        </h1>
                        <p className="text-gray-300 text-lg">
                            {t('YourRecipeCollectionDescription')}
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                        <div className="bg-[#2f2f2f] rounded-xl p-4 sm:p-6 border border-gray-700">
                            <div className="flex items-center gap-3 mb-2">
                                <ChefHat className="w-6 h-6 text-[#FF7A00]" />
                                <h3 className="text-lg font-semibold text-white">{t('TotalRecipes')}</h3>
                            </div>
                            <p className="text-3xl font-bold text-[#FF7A00]">{totalRecipes}</p>
                        </div>

                        {/* <div className="bg-[#2f2f2f] rounded-xl p-4 sm:p-6 border border-gray-700">
                            <div className="flex items-center gap-3 mb-2">
                                <TrendingUp className="w-6 h-6 text-[#FF7A00]" />
                                <h3 className="text-lg font-semibold text-white">Total Views</h3>
                            </div>
                            <p className="text-3xl font-bold text-[#FF7A00]">{totalViews}</p>
                        </div> */}

                        <div className="bg-[#2f2f2f] rounded-xl p-4 sm:p-6 border border-gray-700">
                            <div className="flex items-center gap-3 mb-2">
                                <Calendar className="w-6 h-6 text-[#FF7A00]" />
                                <h3 className="text-lg font-semibold text-white">{t('AvgRating')}</h3>
                            </div>
                            <p className="text-3xl font-bold text-[#FF7A00]">
                                {averageRating > 0 ? averageRating.toFixed(1) : "0.0"}/5
                            </p>
                        </div>
                    </div>

                    {/* Add Recipe Button */}
                    <div className="flex justify-center mb-8">
                        <Link
                            href="/recipes/add-recipe"
                            className="group flex items-center gap-3 bg-gradient-to-r from-[#FF7A00] to-amber-500 hover:from-[#FF7A00] hover:to-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300"
                        >
                            <PlusCircle className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                            <span className="font-pacifico">{t('AddNewRecipe')}</span>
                        </Link>
                    </div>

                    {/* Loading State */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div key={i} className="bg-[#2f2f2f] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg animate-pulse">
                                    {/* Image skeleton */}
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
                    ) : userRecipes.length > 0 ? (
                        /* Recipes Grid */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                            {userRecipes.map((recipe) => (
                                <RecipeCard
                                    key={recipe._id}
                                    recipe={recipe}
                                    onUnsave={handleRecipeDelete}
                                />
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-16">
                            <div className="max-w-md mx-auto">
                                <div className="text-8xl mb-6">👨‍🍳</div>
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    {t('NoRecipesYet')}
                                </h3>
                                <p className="text-gray-400 mb-8">
                                    {t('StartYourCulinaryJourney')}
                                </p>
                                <Link
                                    href="/recipes/add-recipe"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF7A00] to-amber-500 hover:from-[#FF7A00] hover:to-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                                >
                                    <PlusCircle className="w-5 h-5" />
                                    {t('CreateYourFirstRecipe')}
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
