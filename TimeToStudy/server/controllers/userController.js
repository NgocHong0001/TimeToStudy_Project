import User from '../models/user.js';

export const registerUser = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User
    ({ 
      firstname, 
      lastname, 
      username, 
      email, 
      password });

    await newUser.save();
    console.log(newUser); // Debug

    return res.status(201).json({ message: "User successfully created!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  if (req.user) {
    res.json(req.user); // Info about the logged in user
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
