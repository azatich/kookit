export interface SessionUser {
  userId: string;
  email: string;
  name?: string;
  phone?: string;
  profileImage?: string;
  profileImagePublicId?: string;
  savedRecipes?: string[];
  createdAt?: Date;
}
