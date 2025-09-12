'use client'

import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import { getSessionUser, getUserRecipes } from "@/lib/helpers/api";
import { IRecipe } from "@/types/RecipeItem";
import { SessionUser } from "@/types/SessionUser";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const YourPostsPage = () => {
    const [userRecipes, setUserRecipes] = useState<IRecipe[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        async function loadUserRecipes() {
            setIsLoading(true);
            const session = await getSessionUser();
            const data = await getUserRecipes(session.userId);
            setUserRecipes(data);
            setIsLoading(false);
        }
        loadUserRecipes();
    }, [])
    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {isLoading ? (
                    <div className="flex justify-center items-center h-screen">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {userRecipes.map((recipe) => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default YourPostsPage;