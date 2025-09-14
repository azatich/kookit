"use client";

import React, { ChangeEvent, useState } from "react";

import { CiCircleRemove } from "react-icons/ci";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRecipeForm } from "@/hooks/useRecipeForm";

const AddRecipe = () => {
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>("");
  const [isLoadingAddRecipe, setIsLoadingAddRecipe] = useState<boolean>(false);

  const {
    formData,
    errors,
    validateForm,
    validateField,
    updateField,
    addIngredient,
    updateIngredient,
    removeIngredient,
    addDirection,
    updateDirection,
    removeDirection,
    resetForm,
  } = useRecipeForm();

  const t = useTranslations('RecipesPage')


  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm(image)) {
      return;
    }
    setIsLoadingAddRecipe(true);

    try {
      const uploadFormData = new FormData();
      if (image) {
        uploadFormData.append("image", image);
      }

      const uploadRes = await fetch("/api/upload-image", {
        method: "POST",
        body: uploadFormData,
      });

      if (!uploadRes.ok) {
        throw new Error("Image upload failed");
      }

      const { url, public_id } = await uploadRes.json();

      const newRecipe = {
        title: formData.title,
        imageURL: url,
        imagePublicId: public_id,
        description: formData.description,
        prepTime: formData.prepTime,
        cookTime: formData.cookTime,
        ingredients: formData.ingredients,
        directions: formData.directions,
      };

      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });

      if (res.ok) {
        setImage(undefined);
        setPreview('');
        resetForm();
      } else {
        console.error("❌ Failed to submit recipe");
      }

      setIsLoadingAddRecipe(false);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoadingAddRecipe(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      // Clear image error when valid file is selected
      // Note: Image validation is handled in the hook's validateForm function
    }
  }


  return (
    <div className="min-h-screen bg-[#222] text-white">
      {/* Background blurred circles */}
      <div className="absolute right-0 bg-[#FF7A00] w-[7rem] h-[7rem] blur-[10rem]" />
      <div className="absolute left-0 bottom-0 bg-[#FF7A00] w-[7rem] h-[7rem] blur-[10rem]" />

      <div className="max-w-4xl mx-auto">
        <Link
          href="/recipes"
          className="inline-block bg-[#ffa500] px-4 py-2 my-4 rounded-lg text-white hover:bg-amber-600 transition duration-300"
        >
          {t('AddRecipe.GoToRecipes')}
        </Link>

        <div className="py-4">
          <h1
            className={`font-pacifico text-center text-4xl font-bold uppercase`}
          >
            {t('ShareYourRecipe')} 🍔
          </h1>
        </div>
        <div>
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block mb-2 uppercase font-semibold">
                {t('AddRecipe.Title')}
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                onBlur={() => validateField('title')}
                placeholder="e.g., Spicy Chicken Chili"
                className={`w-full px-4 py-2 rounded-lg border ${errors.title ? "border-red-400 bg-red-50" : "border-white"
                  }`}
                required
              />
              <div className="flex justify-between items-center mt-1">
                {errors.title && (
                  <p className="text-sm text-red-400">{errors.title}</p>
                )}
                <p className={`text-xs ml-auto ${formData.title.length > 100 ? "text-red-400" : "text-gray-400"
                  }`}>
                  {formData.title.length}/100
                </p>
              </div>
            </div>
            <div className={`w-full border rounded-lg p-6 text-center shadow-sm ${errors.image ? "border-red-400" : "border-gray-300"
              }`}>
              <h2 className="text-lg font-semibold text-white">{t('AddRecipe.UploadImage')}</h2>

              <div className="mt-6">
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-700 transition duration-300"
                >
                  {t('AddRecipe.ChooseFile')}
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleChange}
                />
              </div>

              {preview && (
                <div className="mt-6 flex justify-center">
                  <div className="relative w-40 h-40 sm:w-56 sm:h-56">
                    <Image
                      src={preview}
                      alt="Uploaded Preview"
                      fill
                      className="object-cover rounded-md border"
                    />
                  </div>
                </div>
              )}

              {errors.image && (
                <p className="mt-2 text-sm text-red-400">{errors.image}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 uppercase font-semibold">
                {t('AddRecipe.Description')} <span className="text-gray-400 text-sm font-normal">(optional)</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                onBlur={() => validateField('description')}
                placeholder={t('AddRecipe.ShortDescription')}
                className={`w-full px-4 py-2 rounded-lg border ${errors.description ? "border-red-400 bg-red-50" : "border-white"
                  }`}
                rows={4}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description && (
                  <p className="text-sm text-red-400">{errors.description}</p>
                )}
                <p className={`text-xs ml-auto ${formData.description.length > 500 ? "text-red-400" : "text-gray-400"
                  }`}>
                  {formData.description.length}/500 {formData.description.length === 0 && "(optional)"}
                </p>
              </div>
            </div>

            {/* Prep & Cook Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 uppercase font-semibold">
                  {t('AddRecipe.PrepTime')}
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  value={formData.prepTime}
                  onChange={(e) => updateField('prepTime', e.currentTarget.valueAsNumber)}
                  onBlur={() => validateField('prepTime')}
                  placeholder="e.g., 15"
                  className={`w-full px-4 py-2 rounded-lg border ${errors.prepTime ? "border-red-400 bg-red-50" : "border-white"
                    }`}
                />
                {errors.prepTime && (
                  <p className="mt-1 text-sm text-red-400">{errors.prepTime}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 uppercase font-semibold">
                  {t('AddRecipe.CookTime')}
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  value={formData.cookTime}
                  onChange={(e) => updateField('cookTime', e.currentTarget.valueAsNumber)}
                  onBlur={() => validateField('cookTime')}
                  placeholder="e.g., 120"
                  className={`w-full px-4 py-2 rounded-lg border ${errors.cookTime ? "border-red-400 bg-red-50" : "border-white"
                    }`}
                />
                {errors.cookTime && (
                  <p className="mt-1 text-sm text-red-400">{errors.cookTime}</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block mb-2 font-semibold">{t('AddRecipe.Ingredients')}</label>
                <button
                  onClick={addIngredient}
                  type="button"
                  className="flex items-center gap-2 text-amber-500 hover:text-amber-600"
                >
                  <PlusCircle className="w-5 h-5" /> {t('AddRecipe.AddIngredient')}
                </button>
              </div>
              {formData.ingredients.map((ingredient, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-center mt-2 border border-white rounded-lg px-3 py-2"
                >
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => updateIngredient(i, e.target.value)}
                    onBlur={() => validateField('ingredients')}
                    className="flex-1 bg-transparent outline-none text-white"
                    placeholder={`${t('AddRecipe.Ingredient')} ${i + 1}`}
                    required
                  />
                  <button type="button" onClick={() => removeIngredient(i)}>
                    <CiCircleRemove className="w-6 h-6 text-red-400 hover:text-red-500" />
                  </button>
                </div>
              ))}
              {errors.ingredients && (
                <p className="mt-2 text-sm text-red-400">{errors.ingredients}</p>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block mb-2 font-semibold">{t('AddRecipe.Steps')}</label>
                <button
                  onClick={addDirection}
                  type="button"
                  className="flex items-center gap-2 text-amber-500 hover:text-amber-600"
                >
                  <PlusCircle className="w-5 h-5" /> {t('AddRecipe.AddStep')}
                </button>
              </div>
              {formData.directions.map((direction, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-center mt-2 border border-white rounded-lg px-3 py-2"
                >
                  <input
                    type="text"
                    value={direction}
                    onChange={(e) => updateDirection(i, e.target.value)}
                    onBlur={() => validateField('directions')}
                    placeholder={`Step ${i + 1}`}
                    className="flex-1 bg-transparent outline-none text-white"
                    required
                  />
                  <button type="button" onClick={() => removeDirection(i)}>
                    <CiCircleRemove className="w-6 h-6 text-red-400 hover:text-red-500" />
                  </button>
                </div>
              ))}
              {errors.directions && (
                <p className="mt-2 text-sm text-red-400">{errors.directions}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoadingAddRecipe}
              className={`uppercase font-semibold transition duration-300 px-4 py-2 rounded-lg mt-4 ${isLoadingAddRecipe
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-600"
                }`}
            >
              {isLoadingAddRecipe ? (
                <div className="text-center">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-amber-400"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">{t('AddRecipe.AddingRecipe')}</span>
                  </div>
                </div>
              ) : (
                `${t('AddRecipe.AddRecipe')}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
