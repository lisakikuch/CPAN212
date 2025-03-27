import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "A recipe must have a name"],
        },
        description: {
            type: String,
            required: [true, "A recipe must have a description"]
        },
        difficulty: {
            type: String,
            required: [true, "A recipe must have a difficulty"]
        },
        ingredients: {
            type: [String],
            required: [true, "A recipe must have more than one ingredient"]
        },
        steps: {
            type: [String],
            required: [true, "A recipe must have more than one step"]
        }
    }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;