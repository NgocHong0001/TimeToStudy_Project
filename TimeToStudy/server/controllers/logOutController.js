// controllers/logoutController.js
export const logOutUser = (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });

  return res.status(200).json({ message: 'Logged out' });
};
