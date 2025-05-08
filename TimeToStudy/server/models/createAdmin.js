// server/createAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './user.js';


dotenv.config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI); 

  const existingAdmin = await User.findOne({ username: 'admin' });
  if (existingAdmin) {
    console.log('Admin already exists.');
    return mongoose.disconnect();
  }

  const admin = new User({
    firstname: 'NgFrCH',
    lastname: 'HoJoLu',
    username: 'admin',
    email: 'admin@example.com',
    password: 'pokemon',
    isAdmin: true
  });

  await admin.save();
  console.log('Admin user created.');
  mongoose.disconnect();
}

createAdmin();
