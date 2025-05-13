import jwt from 'jsonwebtoken';

export const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token (cookie)' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const accessToken = jwt.sign(
      {
        userId: decoded.userId,
        username: decoded.username,
        firstname: decoded.firstname,
        lastname: decoded.lastname,
        isAdmin: decoded.isAdmin
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    console.error("Error verifying refresh token:", err);
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};
