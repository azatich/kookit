"use client";

import React, { ChangeEvent, useState } from "react";

import { CiCircleRemove } from "react-icons/ci";
import { Caprasimo } from "next/font/google";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const caprasimo = Caprasimo({ subsets: ["latin"], weight: ["400"] });

const AddRecipe = () => {
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [prepTime, setPrepTime] = useState<number>(0);
  const [cookTime, setCookTime] = useState<number>(0);
  const [prepTimeError, setPrepTimeError] = useState<string>("");
  const [cookTimeError, setCookTimeError] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [directions, setDirections] = useState<string[]>([""]);
  const [isLoadingAddRecipe, setIsLoadingAddRecipe] = useState<boolean>(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsLoadingAddRecipe(true);

    // Validate times before proceeding
    const isPrepInvalid = Number.isNaN(prepTime) || prepTime < 0;
    const isCookInvalid = Number.isNaN(cookTime) || cookTime < 0;
    if (isPrepInvalid || isCookInvalid) {
      if (isPrepInvalid) setPrepTimeError("Prep time must be a non-negative number");
      if (isCookInvalid) setCookTimeError("Cook time must be a non-negative number");
      setIsLoadingAddRecipe(false);
      return;
    }

    if (!image) {
      console.error("⚠️ No image selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);

      const uploadRes = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Image upload failed");
      }

      const { url, public_id } = await uploadRes.json();

      const newRecipe = {
        title,
        imageURL: url,
        imagePublicId: public_id,
        description,
        prepTime,
        cookTime,
        ingredients,
        directions,
      };

      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });

      if (res.ok) {
        console.log("✅ Recipe submitted successfully");
        setTitle('');
        setPreview('')
        setDescription('')
        setPrepTime(0)
        setCookTime(0)
        setIngredients([])
        setDirections([]);
        setPrepTimeError("");
        setCookTimeError("");
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
    }
  }

  function addIngredient() {
    setIngredients([...ingredients, ""]);
  }
  function updateIngredient(i: number, value: string) {
    const updatedIngs = [...ingredients];
    updatedIngs[i] = value;
    setIngredients(updatedIngs);
  }
  function removeIngredient(i: number) {
    const updatedIngs = [...ingredients];
    updatedIngs.splice(i, 1);
    setIngredients(updatedIngs);
  }

  function addStep() {
    setDirections([...directions, ""]);
  }
  function updateDirections(i: number, value: string) {
    const updateDirs = [...directions];
    updateDirs[i] = value;
    setDirections(updateDirs);
  }
  function removeDirection(i: number) {
    const updateDirs = [...directions];
    updateDirs.splice(i, 1);
    setDirections(updateDirs);
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
          Go to recipes
        </Link>

        <div className="py-4">
          <h1
            className={`${caprasimo.className} text-center text-4xl font-bold uppercase`}
          >
            Share your recipe 🍔
          </h1>
        </div>
        <div>
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block mb-2 uppercase font-semibold">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Spicy Chicken Chili"
                className="w-full px-4 py-2 rounded-lg border border-white"
                required
              />
            </div>
            <div className="w-full border border-gray-300 rounded-lg p-6 text-center shadow-sm">
              <h2 className="text-lg font-semibold text-white">Upload Image</h2>

              <div className="mt-6">
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-700 transition duration-300"
                >
                  Choose File
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.txt,.doc,.docx,.png,.jpg,.jpeg"
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
            </div>

            <div>
              <label className="block mb-2 uppercase font-semibold">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description..."
                className="w-full px-4 py-2 rounded-lg border border-white"
                rows={4}
              />
            </div>

            {/* Prep & Cook Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 uppercase font-semibold">
                  Prep Time (In minutes)
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  value={prepTime}
                  onChange={(e) => {
                    const next = e.currentTarget.valueAsNumber;
                    if (Number.isNaN(next)) {
                      setPrepTimeError("Please enter a number");
                      return;
                    }
                    if (next < 0) {
                      setPrepTimeError("Prep time must be a non-negative number");
                    } else {
                      setPrepTimeError("");
                    }
                    setPrepTime(next);
                  }}
                  placeholder="e.g., 15"
                  className={`w-full px-4 py-2 rounded-lg border ${prepTimeError ? "border-red-400" : "border-white"}`}
                />
                {prepTimeError && (
                  <p className="mt-1 text-sm text-red-400">{prepTimeError}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 uppercase font-semibold">
                  Cook Time (In minutes)
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  value={cookTime}
                  onChange={(e) => {
                    const next = e.currentTarget.valueAsNumber;
                    if (Number.isNaN(next)) {
                      setCookTimeError("Please enter a number");
                      return;
                    }
                    if (next < 0) {
                      setCookTimeError("Cook time must be a non-negative number");
                    } else {
                      setCookTimeError("");
                    }
                    setCookTime(next);
                  }}
                  placeholder="e.g., 120"
                  className={`w-full px-4 py-2 rounded-lg border ${cookTimeError ? "border-red-400" : "border-white"}`}
                />
                {cookTimeError && (
                  <p className="mt-1 text-sm text-red-400">{cookTimeError}</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block mb-2 font-semibold">Ingredients</label>
                <button
                  onClick={addIngredient}
                  type="button"
                  className="flex items-center gap-2 text-amber-500 hover:text-amber-600"
                >
                  <PlusCircle className="w-5 h-5" /> Add Ingredient
                </button>
              </div>
              {ingredients.map((ingredient, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-center mt-2 border border-white rounded-lg px-3 py-2"
                >
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => updateIngredient(i, e.target.value)}
                    className="flex-1 bg-transparent outline-none text-white"
                    placeholder={`Ingredient ${i + 1}`}
                    required
                  />
                  <button type="button" onClick={() => removeIngredient(i)}>
                    <CiCircleRemove className="w-6 h-6 text-red-400 hover:text-red-500" />
                  </button>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block mb-2 font-semibold">Steps</label>
                <button
                  onClick={addStep}
                  type="button"
                  className="flex items-center gap-2 text-amber-500 hover:text-amber-600"
                >
                  <PlusCircle className="w-5 h-5" /> Add Step
                </button>
              </div>
              {directions.map((direction, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-center mt-2 border border-white rounded-lg px-3 py-2"
                >
                  <input
                    type="text"
                    value={direction}
                    onChange={(e) => updateDirections(i, e.target.value)}
                    placeholder={`Step ${i + 1}`}
                    className="flex-1 bg-transparent outline-none text-white"
                    required
                  />
                  <button type="button" onClick={() => removeDirection(i)}>
                    <CiCircleRemove className="w-6 h-6 text-red-400 hover:text-red-500" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="submit"
              disabled={isLoadingAddRecipe}
              className="bg-amber-500 uppercase font-semibold hover:bg-amber-600 transition duration-300 px-4 py-2 rounded-lg mt-4"
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
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                "Add recipe"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
