import { useState } from 'react';

export interface RecipeFormData {
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  ingredients: string[];
  directions: string[];
}

export interface RecipeFormErrors {
  title: string;
  image: string;
  description: string;
  prepTime: string;
  cookTime: string;
  ingredients: string;
  directions: string;
}

export const useRecipeForm = () => {
  // Form data state
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    description: '',
    prepTime: 0,
    cookTime: 0,
    ingredients: [''],
    directions: [''],
  });

  // Validation errors state
  const [errors, setErrors] = useState<RecipeFormErrors>({
    title: '',
    image: '',
    description: '',
    prepTime: '',
    cookTime: '',
    ingredients: '',
    directions: '',
  });

  // Validation functions
  const validateTitle = (value: string): string => {
    if (!value.trim()) return "Title is required";
    if (value.trim().length < 3) return "Title must be at least 3 characters";
    if (value.trim().length > 100) return "Title must be less than 100 characters";
    return "";
  };

  const validateImage = (file: File | undefined): string => {
    if (!file) return "Image is required";
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return "Please upload a valid image (JPEG, PNG, or WebP)";
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      return "Image size must be less than 5MB";
    }
    return "";
  };

  const validateDescription = (value: string): string => {
    if (value.trim() && value.trim().length < 10) return "Description must be at least 10 characters";
    if (value.trim().length > 500) return "Description must be less than 500 characters";
    return "";
  };

  const validateTime = (value: number, fieldName: string): string => {
    if (Number.isNaN(value)) return `${fieldName} must be a valid number`;
    if (value < 0) return `${fieldName} must be a non-negative number`;
    if (value > 1440) return `${fieldName} must be less than 24 hours (1440 minutes)`;
    return "";
  };

  const validateIngredients = (ingredients: string[]): string => {
    const validIngredients = ingredients.filter(ing => ing.trim().length > 0);
    if (validIngredients.length === 0) return "At least one ingredient is required";
    if (validIngredients.some(ing => ing.trim().length < 2)) {
      return "Each ingredient must be at least 2 characters";
    }
    return "";
  };

  const validateDirections = (directions: string[]): string => {
    const validDirections = directions.filter(dir => dir.trim().length > 0);
    if (validDirections.length === 0) return "At least one cooking step is required";
    if (validDirections.some(dir => dir.trim().length < 10)) {
      return "Each cooking step must be at least 10 characters";
    }
    return "";
  };

  const validateForm = (image?: File): boolean => {
    const newErrors = {
      title: validateTitle(formData.title),
      image: validateImage(image),
      description: validateDescription(formData.description),
      prepTime: validateTime(formData.prepTime, "Prep time"),
      cookTime: validateTime(formData.cookTime, "Cook time"),
      ingredients: validateIngredients(formData.ingredients),
      directions: validateDirections(formData.directions),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  // Form field update functions
  const updateField = (field: keyof RecipeFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  // Ingredient management functions
  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, ""]
    }));
  };

  const updateIngredient = (index: number, value: string) => {
    setFormData(prev => {
      const updatedIngredients = [...prev.ingredients];
      updatedIngredients[index] = value;
      return { ...prev, ingredients: updatedIngredients };
    });
    setErrors(prev => ({ ...prev, ingredients: "" }));
  };

  const removeIngredient = (index: number) => {
    setFormData(prev => {
      const updatedIngredients = [...prev.ingredients];
      updatedIngredients.splice(index, 1);
      return { ...prev, ingredients: updatedIngredients };
    });
  };

  // Direction management functions
  const addDirection = () => {
    setFormData(prev => ({
      ...prev,
      directions: [...prev.directions, ""]
    }));
  };

  const updateDirection = (index: number, value: string) => {
    setFormData(prev => {
      const updatedDirections = [...prev.directions];
      updatedDirections[index] = value;
      return { ...prev, directions: updatedDirections };
    });
    setErrors(prev => ({ ...prev, directions: "" }));
  };

  const removeDirection = (index: number) => {
    setFormData(prev => {
      const updatedDirections = [...prev.directions];
      updatedDirections.splice(index, 1);
      return { ...prev, directions: updatedDirections };
    });
  };

  // Validation trigger functions
  const validateField = (field: keyof RecipeFormData) => {
    let error = "";
    switch (field) {
      case "title":
        error = validateTitle(formData.title);
        break;
      case "description":
        error = validateDescription(formData.description);
        break;
      case "prepTime":
        error = validateTime(formData.prepTime, "Prep time");
        break;
      case "cookTime":
        error = validateTime(formData.cookTime, "Cook time");
        break;
      case "ingredients":
        error = validateIngredients(formData.ingredients);
        break;
      case "directions":
        error = validateDirections(formData.directions);
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Reset form function
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      prepTime: 0,
      cookTime: 0,
      ingredients: [''],
      directions: [''],
    });
    setErrors({
      title: '',
      image: '',
      description: '',
      prepTime: '',
      cookTime: '',
      ingredients: '',
      directions: '',
    });
  };

  return {
    // State
    formData,
    errors,
    
    // Validation
    validateForm,
    validateField,
    
    // Field updates
    updateField,
    
    // Ingredient management
    addIngredient,
    updateIngredient,
    removeIngredient,
    
    // Direction management
    addDirection,
    updateDirection,
    removeDirection,
    
    // Utilities
    resetForm,
  };
};
