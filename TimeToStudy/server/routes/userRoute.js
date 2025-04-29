import { registerUser } from '../controller/userController.js';
import express from 'express';

const router = express();

// Register new students
router.post('/register', registerUser);

//  Login
router.post('/login', loginUser);

export default router;


