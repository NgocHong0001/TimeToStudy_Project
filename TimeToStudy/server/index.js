import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import mongoose from 'mongoose';
dotenv.config();


const DB_PORT = process.env.PORT || 5000;
const DB_MONGODB = process.env.MONGO_URI;
// Where we run everything

console.log("URI from env:", process.env.MONGO_URI); // kontrollera att env funkar

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Time To Study");
});

app.use('/api/users', userRoute);

// Connect to MongoDB
console.log("Trying to connect to MongoDB...");
mongoose.connect(DB_MONGODB)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

  console.log("It was called.");

app.listen(DB_PORT, () => {
    console.log(`Server running on http://localhost:${DB_PORT}..`);
});