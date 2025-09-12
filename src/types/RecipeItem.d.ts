export interface IRecipe {
  _id: string,
  title: string;
  rating?: [string, number][];
  description?: string;
  authorId: string;
  postedDate: Date;
  imageURL?: string;
  imagePublicId?: string;
  prepTime?: string;
  cookTime?: string;
  ingredients: string[];
  directions: string[];
}
