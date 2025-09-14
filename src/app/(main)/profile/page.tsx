'use client'

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";
import { MdEdit, MdCameraAlt, MdLogout, MdPerson, MdEmail, MdPhone, MdDateRange, MdFavorite, MdRestaurant } from "react-icons/md";
import { RiCheckboxCircleLine, RiCloseLine } from "react-icons/ri";
import { getSessionUser, updateUserProfile, getUserRecipes, getFavourites } from "@/lib/helpers/api";
import { SessionUser } from "@/types/SessionUser";
import { IRecipe } from "@/types/RecipeItem";
import { logoutAction } from "@/actions/auth";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const [user, setUser] = useState<SessionUser | null>(null);
    const [userRecipes, setUserRecipes] = useState<IRecipe[]>([]);
    const [favouriteRecipes, setFavouriteRecipes] = useState<IRecipe[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [nameValue, setNameValue] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            setIsLoading(true);
            const [userData, favourites] = await Promise.all([
                getSessionUser(),
                getFavourites()
            ]);

            setUser(userData);
            setNameValue(userData.name || "");
            setPhoneValue(userData.phone || "");

            if (userData.userId) {
                const userRecipesData = await getUserRecipes(userData.userId);
                setUserRecipes(userRecipesData);
            }

            setFavouriteRecipes(favourites);
        } catch (error) {
            console.error("Error loading user data:", error);
            setError("Failed to load profile data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveName = async () => {
        if (!user) return;

        try {
            const updatedUser = await updateUserProfile({ name: nameValue });
            setUser(updatedUser);
            setIsEditingName(false);
            setSuccess("Name updated successfully");
            setTimeout(() => setSuccess(""), 3000);
        } catch (error) {
            setError("Failed to update name");
            setTimeout(() => setError(""), 3000);
        }
    };

    const handleSavePhone = async () => {
        if (!user) return;

        try {
            const updatedUser = await updateUserProfile({ phone: phoneValue });
            setUser(updatedUser);
            setIsEditingPhone(false);
            setSuccess("Phone updated successfully");
            setTimeout(() => setSuccess(""), 3000);
        } catch (error) {
            setError("Failed to update phone");
            setTimeout(() => setError(""), 3000);
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !user) return;

        setIsUploadingImage(true);
        try {
            // Upload image to server
            const formData = new FormData();
            formData.append("file", file);

            const uploadResponse = await fetch("/api/upload-profile-image", {
                method: "POST",
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error("Upload failed");
            }

            const { imageURL, publicId } = await uploadResponse.json();

            // Update user profile with new image
            const updatedUser = await updateUserProfile({
                profileImage: imageURL,
                profileImagePublicId: publicId
            });
            setUser(updatedUser);
            setSuccess("Profile picture updated successfully");
            setTimeout(() => setSuccess(""), 3000);
        } catch (error) {
            setError("Failed to upload image");
            setTimeout(() => setError(""), 3000);
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logoutAction();
            router.push("/login");
        } catch (error) {
            setError("Failed to logout");
        }
    };

    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formattedJoinDate = useMemo(() => {
        if (!user?.createdAt) return '';
        return formatDate(user.createdAt);
    }, [user?.createdAt]);

    if (isLoading) {
        return (
            <div>
                <Navbar />
                <main className="flex-1 flex flex-col items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
                    <p className="text-white mt-4">Loading profile...</p>
                </main>
            </div>
        );
    }

    if (!user) {
        return (
            <div>
                <Navbar />
                <main className="flex-1 flex flex-col items-center justify-center min-h-screen">
                    <p className="text-white text-xl">Failed to load profile</p>
                </main>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <main className="flex-1 flex flex-col">
                <div className="w-full mx-auto p-4 sm:p-6 lg:p-8 relative z-10 max-w-4xl">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl uppercase text-white mb-6 sm:mb-8 lg:mb-10 text-center">Profile</h1>

                    {/* Success/Error Messages */}
                    {success && (
                        <div className="bg-green-500 text-white p-3 rounded-lg mb-4 text-center">
                            {success}
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                                {/* Profile Image */}
                                <div className="relative inline-block mb-4">
                                    <Image
                                        src={user.profileImage || '/images/profile.png'}
                                        alt='profile'
                                        width={150}
                                        height={150}
                                        className="rounded-full border-4 border-white/20"
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isUploadingImage}
                                        className="absolute bottom-2 right-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 transition duration-300 disabled:opacity-50"
                                    >
                                        {isUploadingImage ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        ) : (
                                            <MdCameraAlt size={16} />
                                        )}
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>

                                {/* Name */}
                                <div className="mb-4">
                                    {isEditingName ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <input
                                                type="text"
                                                value={nameValue}
                                                onChange={(e) => setNameValue(e.target.value)}
                                                className="bg-white/20 text-white placeholder-white/70 rounded-lg px-3 py-2 text-center"
                                                placeholder="Enter your name"
                                            />
                                            <button
                                                onClick={handleSaveName}
                                                className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition duration-300"
                                            >
                                                <RiCheckboxCircleLine size={20} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsEditingName(false);
                                                    setNameValue(user.name || "");
                                                }}
                                                className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition duration-300"
                                            >
                                                <RiCloseLine size={20} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            <h2 className="text-2xl sm:text-3xl text-white font-semibold">
                                                {user.name || "No name set"}
                                            </h2>
                                            <button
                                                onClick={() => setIsEditingName(true)}
                                                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition duration-300"
                                            >
                                                <MdEdit size={20} />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <MdEmail className="text-white/70" size={20} />
                                    <p className="text-white/90">{user.email}</p>
                                </div>

                                {/* Phone */}
                                <div className="mb-6">
                                    {isEditingPhone ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <input
                                                type="tel"
                                                value={phoneValue}
                                                onChange={(e) => setPhoneValue(e.target.value)}
                                                className="bg-white/20 text-white placeholder-white/70 rounded-lg px-3 py-2 text-center"
                                                placeholder="Enter your phone"
                                            />
                                            <button
                                                onClick={handleSavePhone}
                                                className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition duration-300"
                                            >
                                                <RiCheckboxCircleLine size={20} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsEditingPhone(false);
                                                    setPhoneValue(user.phone || "");
                                                }}
                                                className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition duration-300"
                                            >
                                                <RiCloseLine size={20} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            <MdPhone className="text-white/70" size={20} />
                                            <p className="text-white/90">
                                                {user.phone || "No phone set"}
                                            </p>
                                            <button
                                                onClick={() => setIsEditingPhone(true)}
                                                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition duration-300"
                                            >
                                                <MdEdit size={20} />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Join Date */}
                                {user.createdAt && (
                                    <div className="flex items-center justify-center gap-2 mb-6">
                                        <MdDateRange className="text-white/70" size={20} />
                                        <p className="text-white/70 text-sm">
                                            Joined {formatDate(user.createdAt)}
                                        </p>
                                    </div>
                                )}

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                                >
                                    <MdLogout size={20} />
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Stats and Activity */}
                        <div className="lg:col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {/* Stats Cards */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <MdRestaurant className="text-orange-400" size={24} />
                                        <h3 className="text-white text-xl font-semibold">My Recipes</h3>
                                    </div>
                                    <p className="text-3xl font-bold text-white">{userRecipes.length}</p>
                                    <p className="text-white/70 text-sm">Recipes created</p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <MdFavorite className="text-red-400" size={24} />
                                        <h3 className="text-white text-xl font-semibold">Favorites</h3>
                                    </div>
                                    <p className="text-3xl font-bold text-white">{favouriteRecipes.length}</p>
                                    <p className="text-white/70 text-sm">Saved recipes</p>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                <h3 className="text-white text-xl font-semibold mb-4">Recent Activity</h3>
                                {userRecipes.length > 0 ? (
                                    <div className="space-y-3">
                                        {userRecipes.slice(0, 3).map((recipe) => (
                                            <div key={recipe._id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                                <Image
                                                    src={recipe.imageURL ?? '/images/recipeThumbnail.png'}
                                                    alt={recipe.title}
                                                    width={50}
                                                    height={50}
                                                    className="rounded-lg object-cover"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-white font-medium">{recipe.title}</p>
                                                    <p className="text-white/70 text-sm">
                                                        Created {new Date(recipe.postedDate).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-white/70 text-center py-8">
                                        No recipes created yet. Start sharing your culinary creations!
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}