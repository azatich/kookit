import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  profileImage: {
    type: String,
    default: "",
  },
  profileImagePublicId: {
    type: String,
    default: "",
  },
  savedRecipes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User;
