import User from '../models/user.js';

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Compare current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    // Validate
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message: "New password must be at least 8 characters and include one lowercase letter, one number, and one special character."
      });
    }

    // Save
    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      message: "Password changed successfully.",
      requireReLogin: true
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
