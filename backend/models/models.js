const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Food Item schema
const foodItemSchema = new Schema({
    name: String,
    calories_per_100g: Number
});

// Define the User Input schema
const userInputSchema = new Schema({
    food_item_id: { type: Schema.Types.ObjectId, ref: 'FoodItem' },
    input_grams: Number,
    calculated_calories: Number,
    timestamp: { type: Date, default: Date.now }
});

// Create models from the schemas
const FoodItem = mongoose.model('FoodItem', foodItemSchema);
const UserInput = mongoose.model('UserInput', userInputSchema);
module.exports = { FoodItem, UserInput };