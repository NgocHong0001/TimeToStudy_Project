import mongoose from 'mongoose';
import bcrypt from 'brcypt';

// Create schema for a new user.
const UserSchema = new mongoose.Schema({
  userID: {
    type: String,
    unique: true
  },
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Removes whitespace.
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Gör epostadresser små bokstäver
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

// Function to hash password before save.
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Function to compare passwords when logging in.
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
