import jwt from 'jsonwebtoken';
import User from '../models/user.js';



export const protect = async (req, res, next) => {
  console.log('🔥 PROTECT middleware körs');
  const authHeader = req.headers.authorization;
  console.log("🧾 authHeader:", authHeader);

  if (!authHeader?.startsWith('Bearer ')) {
    console.log("❌ Ingen eller felaktig auth header");
    return res.status(401).json({ message: 'Not authorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🧩 Decoded token:', decoded);

    const userId = decoded.userId; // 🟢 rätt nyckel
    console.log('Looking for user with ID:', userId);

    const user = await User.findById(userId).select('-password');
    if (!user) {
      console.log("🚫 User not found in DB");
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    console.log('🧩 User found:', req.user);
    next();
  } catch (err) {
    console.error("💥 Token verification failed:", err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

