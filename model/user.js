const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Za hesiranje na password

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

// Pre-save middleware for password hashing
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
