import mongoose from 'mongoose';
import router from express.Router();
import User from ('../models/user')

router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;

    try {
    const userExist = await User.findOne({ email }); 
    if (userExist) return res.status(400).json({ message: "User alreadys exists"});

    const newUser = new User({ username, email, password });
    await newUser.save();
    console.log(newUser); //Debug purpose.

    return res.status(201).json({ message: "User succesfully created!"})

} catch (err) {
    return res.status(500).json({ err: err.message });
    
}
})

