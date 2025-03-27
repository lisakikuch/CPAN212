import express from 'express';
import recipeController from '../controllers/recipeController.js';

const router = express.Router();

// Fetch all recipes
router.get("/", recipeController.getAllRecipes);

// Post a recipe
router.post("/", recipeController.addRecipe);

// Get a specific recipe
router.get("/:id", recipeController.getRecipeDetails);

// Edit a specific recipe
router.put("/:id", recipeController.editRecipe);

// Delete a specific recipe
router.delete("/:id", recipeController.deleteRecipe);

export default router;