import express from 'express';
import { registerUser } from '../controllers/userController.js'; 

const router = express();

// Register new students
router.post('/register', registerUser);

export default router;


