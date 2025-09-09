export interface IRecipe {
  _id: string,
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
