<<<<<<< HEAD
import Recipe from "../models/recipeModel.js"

// Add a recipe
const addRecipe = async (req, res) => {
    const { name, description, difficulty, ingredients, steps } = req.body;

    try {
        if (!name || !description || !difficulty || !ingredients || !steps) {
            return res.status(400).json({ message: "All fields need to be filled" });
        }

        const newRecipe = new Recipe({
            name,
            description,
            difficulty,
            ingredients,
            steps
        });
        await newRecipe.save();

        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Edit a recipe
const editRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Fetch all recipes
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching recipes", err });
    }
};

// Fetch a recipe info
const getRecipeDetails = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: "Error fetching recipe details", err });
    }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        await Recipe.findByIdAndDelete(id);

        res.status(200).json({ message: "Recipe deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export default {
    addRecipe,
    editRecipe,
    getAllRecipes,
    getRecipeDetails,
    deleteRecipe,
=======
import Recipe from "../models/recipeModel.js"

// Add a recipe
const addRecipe = async (req, res) => {
    const { name, description, difficulty, ingredients, steps } = req.body;

    try {
        if (!name || !description || !difficulty || !ingredients || !steps) {
            return res.status(400).json({ message: "All fields need to be filled" });
        }

        const newRecipe = new Recipe({
            name,
            description,
            difficulty,
            ingredients,
            steps
        });
        await newRecipe.save();

        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Edit a recipe
const editRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Fetch all recipes
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching recipes", err });
    }
};

// Fetch a recipe info
const getRecipeDetails = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: "Error fetching recipe details", err });
    }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        await Recipe.findByIdAndDelete(id);

        res.status(200).json({ message: "Recipe deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export default {
    addRecipe,
    editRecipe,
    getAllRecipes,
    getRecipeDetails,
    deleteRecipe,
>>>>>>> ea3adfe14087682f9b80fd08300568178f2e7189
}