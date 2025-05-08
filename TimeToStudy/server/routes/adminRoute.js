// server/routes/adminRoute.js
import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';
import { protect } from '../middleware/auth.js';  // Import the protect middleware????

const router = express.Router();


router.get('/data', async (req, res) => {
  try {
    const db = mongoose.connection;
    const collection = db.collection('users');
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error('Error fetching admin data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/create', async (req, res) => {
  const { username, firstname, lastname, password } = req.body;
  try {
    const user = new User({ username, firstname, lastname, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'User creation failed' });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
