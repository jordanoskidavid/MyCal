// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/caloriesApp')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a schema and model for the data
const caloriesSchema = new mongoose.Schema({
    grams: Number,
    totalCalories: Number
});

const Calories = mongoose.model('Calories', caloriesSchema);
// Define routes
//adding calories
app.post('/api/saveCalories', (req, res) => {
    const newCalories = new Calories(req.body);
    newCalories.save()
        .then(calories => res.json(calories))
        .catch(err => res.status(400).json('Error: ' + err));
});
//deleting the calories
app.delete('/api/deleteAllCalories', async (req, res) => {
    try {
        await Calories.deleteMany({});
        res.status(200).json({ message: 'All calories deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete calories', error: error.message });
    }
});

app.get('/api/getAllCalories', (req, res) => {
    Calories.find({})
        .then(calories => res.json(calories))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route to calculate total sum of calories
app.get('/api/calculateTotalCalories', async (req, res) => {
    try {
        const calories = await Calories.find({});
        const totalCalories = calories.reduce((sum, calorie) => sum + calorie.totalCalories, 0);
        res.status(200).json({ totalCalories });
    } catch (error) {
        res.status(500).json({ message: 'Failed to calculate total calories', error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
