// server/routes/adminRoute.js
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Replace 'YourCollectionName' with your actual MongoDB collection name
router.get('/data', async (req, res) => {
  try {
    const db = mongoose.connection;
    const collection = db.collection('users'); // <-- REPLACE THIS
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error('Error fetching admin data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
