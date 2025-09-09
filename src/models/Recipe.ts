import mongoose, { Schema, Document } from "mongoose";

export interface IRecipe extends Document {
  title: string;
  rating?: number;
  description?: string;
  authorId: string;
  postedDate: Date;
  imageURL?: string;
  prepTime?: string;
  cookTime?: string;
  ingredients: string[];
  directions: string[];
}

const RecipeSchema: Schema = new Schema({
  title: { type: String, required: true },
  rating: { type: Number, default: 0 },
  description: { type: String, required: true },
  authorId: { type: String, required: true },
  postedDate: { type: Date, default: Date.now },
  imageURL: { type: String },
  prepTime: { type: String },
  cookTime: { type: String },
  ingredients: [{ type: String, required: true }],
  directions: [{ type: String, required: true }],
});

export default mongoose.models.Recipe || mongoose.model<IRecipe>("Recipe", RecipeSchema);
