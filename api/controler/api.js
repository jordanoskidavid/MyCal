const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Za hesiranje na password
const jwt = require('jsonwebtoken'); // Za generiranje na token

// String za konekcija so MongoDB
const mongoURI = 'mongodb://localhost:27017/mycal';

// Taen kluc za passowrd
const jwtSecret = 'your_jwt_secret';

const app = express();
const port = process.env.PORT || 3000;

// Povrzuvanje so MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Definiranje na Schema Korisnik
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  targetWeight: { type: Number, required: true },
  sex: { type: String, required: true },
  dailyEntries: [{
    date: { type: Date, required: true },
    foodItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }], // Reference food items by ID
    caloriesConsumed: { type: Number, required: true },
    targetAchieved: { type: Boolean, default: false },
  }],
});

// Gotov middleware za hesiranje na password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('User', userSchema);

// Definiranje na Schema za hrana
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
});

const Food = mongoose.model('Food', foodSchema);

// Middleware za vrsenje na bodyParser
app.use(bodyParser.json());

// Presmetka na kaoriski target
function calculateTargetCalories(weight, targetWeight) {
  const weightDiff = weight - targetWeight;
  let calorieAdjustment = 0;
  if (weightDiff > 0) {
    calorieAdjustment = -500; // Adjust for weight loss
  } else if (weightDiff < 0) {
    calorieAdjustment = 300; // Adjust for weight gain
  }
  
  const BMR = 10 * weight; // Placeholder za BMR 
  return BMR + calorieAdjustment;//target kalorii
}

// Middleware za verifikacija na korsnik
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.userId; // Prikacuvanje na userid
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Sign-up (kreiranje na nov korisnik)
app.post('/signup', async (req, res) => {
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

// Sign-in (najava na veke postoecki korisnik)
app.post('/signin', async (req, res) => {
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




