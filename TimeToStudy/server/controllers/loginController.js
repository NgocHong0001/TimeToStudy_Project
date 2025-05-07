import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json( {message: "User not found."});

        const match = await user.comparePassword(password);
        if (!match) return res.status(401).json( {message: "Wrong password."})
        
        const token = jwt.sign(
            { id: user._id, username: user.username, firstname: user.firstname, lastname: user.lastname }, // payload + added firstname to the token so it can be called in Dasboard.jsx!
            process.env.JWT_SECRET,                    // secret key
            { expiresIn: '1h' }                        // expires in 1h
            );

        res.status(200).json({token, username: user.username, firstname: user.firstname, lastname: user.lastname}) // added firstname to the response so it can be called in Dashboard.jsx!
    } catch(error) {
        res.status(500).json({message: error.message});      
    }
}