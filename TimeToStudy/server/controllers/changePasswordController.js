import bcrypt, { hash } from "bcrypt";
import User from "../models/user.js";

export const changePassword = async (req, res) => { 
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const comparePassword = await bcrypt.compare(currentPassword, user.password);
    if (!comparePassword) return res.status(404).json({ message: "Current password is wrong."});

    if (currentPassword === comparePassword) {
      return res.status(400).json({ message: "New password can't be the same as the current password."});
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(newPassword);

    if (!passwordRegex) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long and include:\n- at least one lowercase letter\n- at least one number\n- at least one special character (!@#$%^&*)\n- only letters, numbers, and these special characters are allowed"
      });
    }
    

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully!" });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
