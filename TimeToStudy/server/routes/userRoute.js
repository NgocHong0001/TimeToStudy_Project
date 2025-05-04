import express from 'express';
import { registerUser } from '../controllers/userController.js'; 
import { protect } from '../middleware/auth.js';
import { getUserProfile } from '../controllers/userController.js';
import { loginUser } from '../controllers/loginController.js'; // Import the login controller
import { get } from 'http';
import { log } from 'console';

const router = express.Router();

// Register new students
router.post('/register', registerUser);

// Get user profile. Protect checks if the user is logged in and has 
// a valid token.
// If the user is logged in, the middleware will add the user to 
// the request object as req.user
router.get('/profile', protect, getUserProfile);

// Login user
router.post('/login', loginUser);

export default router;


