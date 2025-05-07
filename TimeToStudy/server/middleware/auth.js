import jwt from 'jsonwebtoken';
import User from '../models/user.js';


export const protect = async (req, res, next) => {
  console.log('🔥 PROTECT middleware körs');
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🧩 Decoded token:', decoded);
    console.log('Looking for user with ID:', decoded.id);
    const user = await User.findById(decoded.id).select('-password');
    req.user = user;
    console.log('🧩 User found:', req.user);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
