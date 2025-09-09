"use client";

import React, { useState } from "react";

import { CiCircleRemove } from "react-icons/ci";
import { Caprasimo } from "next/font/google";
import { CirclePlus, PlusCircle } from "lucide-react";

const caprasimo = Caprasimo({ subsets: ["latin"], weight: ["400"] });

const AddRecipe = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [prepTime, setPrepTime] = useState<string>("");
  const [cookTime, setCookTime] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [directions, setDirections] = useState<string[]>([""]);

  async function onSubmit() {
    const newRecipe = {
      title,
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
      console.log("Recipe submitted successfully");
    } else {
      console.error("Failed to submit recipe");
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
        <div className="py-4">
          <h1
            className={`${caprasimo.className} text-center text-4xl font-bold uppercase`}
          >
            Share your recipe 🍔
          </h1>
        </div>
        <div>
          <form action={onSubmit} className="flex flex-col gap-6">
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
                required
              />
            </div>

            {/* Prep & Cook Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 uppercase font-semibold">
                  Prep Time (In minutes)
                </label>
                <input
                  type="text"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  placeholder="e.g., 15"
                  className="w-full px-4 py-2 rounded-lg border border-white"
                />
              </div>
              <div>
                <label className="block mb-2 uppercase font-semibold">
                  Cook Time (In minutes)
                </label>
                <input
                  type="text"
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  placeholder="e.g., 120"
                  className="w-full px-4 py-2 rounded-lg border border-white"
                />
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
              className="bg-amber-500 uppercase font-semibold hover:bg-amber-600 transition duration-300 px-4 py-2 rounded-lg mt-4"
            >
              Add recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
