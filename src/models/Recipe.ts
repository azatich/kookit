import { IRecipe } from "@/types/RecipeItem";
import mongoose, { Schema } from "mongoose";

const RecipeSchema: Schema = new Schema({
  title: { type: String, required: true },
  rating: { type: [Schema.Types.Mixed], default: [] },
  description: { type: String, required: false },
  authorId: { type: String, required: true },
  postedDate: { type: Date, default: Date.now },
  imageURL: { type: String, required: true },
  imagePublicId: {type: String},
  prepTime: { type: String, required: true },
  cookTime: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  directions: [{ type: String, required: true }],
});


if (mongoose.models.Recipe) {
  delete mongoose.models.Recipe;
}
export default mongoose.model<IRecipe>("Recipe", RecipeSchema);
