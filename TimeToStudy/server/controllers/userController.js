import User from '../models/user.js';

export const registerUser = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  console.log("Recieved: ", req.body);

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({ firstname, lastname, username, email, password });

    await newUser.save();
    console.log(newUser); // Debug

    return res.status(201).json({ message: "User successfully created!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getUserProfile = (req, res) => {
  // req.user created by the auth middleware
  res.json({
    message: `Welcome ${req.user.username}!`,
    userId: req.user.id
  });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};