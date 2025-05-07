import express from 'express';
import { registerUser, getUserProfile, changePassword } from '../controllers/userController.js'; 
import { protect } from '../middleware/auth.js';
import { loginUser } from '../controllers/loginController.js'; // Import the login controller
import { savePlanner, usersPlanner } from '../controllers/plannerController.js'; // Import the planner controller

const router = express.Router();

//Debug ping route to check if the router is working
router.get('/ping', (req, res) => {
    res.json({ message: 'Router is alive!' });
  });
  

// Register new students
router.post('/register', registerUser);

// Get user profile. Protect checks if the user is logged in and has 
// a valid token.
// If the user is logged in, the middleware will add the user to 
// the request object as req.user
router.get('/profile', protect, getUserProfile);

router.post('/change-password', protect, changePassword);

// Login user
router.post('/login', loginUser);

//Save user study plan
router.put('/save-planner', protect, savePlanner);

router.get('/users-planner', protect, usersPlanner);

export default router;


