import bcrypt from "bcrypt";
import User from "./models/User.js";

export const currentPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password." });

    if (currentPassword === newPassword) {
      return res.status(400).json({ message: "New password cannot be the same as the current password." });
    }

    const isValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(newPassword);
    if (!isValid) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long and contain at least one letter, one number, and one special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully." });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
