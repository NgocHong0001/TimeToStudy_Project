import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


// Create schema for a new user.
const UserSchema = new mongoose.Schema({
  /*userID: {
    type: String,
    unique: true
  },*/
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
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Minimum length of password
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

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

// Function to compare passwords when logging in.
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
