import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "User not found." });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: "Wrong password." });

    const token = jwt.sign(

      { userId: user._id, username: user.username, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, username: user.username , isAdmin: user.Admin});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
