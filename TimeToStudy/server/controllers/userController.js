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
      password }); //Security risk. Should never leave the server.

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
  try {
    const user = req.user; // Users comes from the protect middleware
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.json({
      id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password, //Security risk. Should never leave the server.
      
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const changePassword = async (req, res) => { 
  const { newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};