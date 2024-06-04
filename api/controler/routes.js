const express = require('express');
const jwt = require('jsonwebtoken'); // Za generiranje na token
const User = require('MyCal/model/user.js'); // Model User
const Food = require('MyCal/model/food.js'); // Model Food

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Zameni so svoj secret
    req.user = decoded.userId;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

const calculateTargetCalories = (weight, targetWeight) => {
  // Replace with your formula
  const weightDiff = weight - targetWeight;
  let calorieAdjustment = 0;
  if (weightDiff > 0) {
    calorieAdjustment = -500; // Promena za namaluvanje na tezina
  } else if (weightDiff < 0) {
    calorieAdjustment = 300; // Promena za zgolemuvanje na tezina
  }
  
  const BMR = 10 * weight; // Placeholder BMR calculation
  return BMR + calorieAdjustment;
};

const router = express.Router();

// Finkiconalnost za sign-up
router.post('/signup', async (req, res) => {
    const { username, password, height, weight, targetWeight, sex } = req.body;
  
    try {
      const newUser = new User({ username, password, height, weight, targetWeight, sex });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating user' });
    }
  });


// Funkcionanost za sign-in
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password); // Compare hashed passwords
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Uspesna najava
      res.status(200).json({ message: 'Sign-in successful!', user }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error signing in' });
    }
});
