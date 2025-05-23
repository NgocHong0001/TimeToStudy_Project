// controllers/plannerController.js
import Planner from '../models/plannerModel.js';

// PATCH /api/users/clear-study-events
export const deletePlanner = async (req, res) => {
   const plannerId = req.query.plannerId; // ✅ ändrat från req.body
   console.log("🧾 plannerId från query:", plannerId);
   console.log("🧾 userId från token:", req.user._id);

  try {
    console.log("UserID from token:", req.user._id);
   
    const planner = await Planner.findOneAndDelete({ _id: plannerId, userId: req.user._id });

    if (!planner) {
      return res.status(404).json({ message: 'Planner not found or unauthorized' });
    }

    res.status(200).json({ message: 'Study events cleared successfully' });
  } catch (err) {
    console.error('Error clearing study events:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const usersPlanner = async (req, res) => {
  try {
    const userId = req.user._id; // Comes from protect middleware token
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const planner = await Planner.findOne({ userId });
    if (!planner) {
      return res.status(404).json({ error: 'Planner not found' });
    }

    res.status(200).json(planner);
  } catch (error) {
    console.error('Error fetching planner:', error);
    res.status(500).json({ error: 'Failed to fetch planner' });
  }
}

export const savePlanner = async (req, res) => {
  
    console.log('USER:', req.user); // kommer från protect middleware

  try {
    const userId = req.user._id; // Comes from protect middleware token
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const {
      studyType,
      studyPace,
      startDate,
      endDate,
      recommendedHours,
      studyEvents
    } = req.body;

    const newPlanner = await Planner.findOneAndUpdate(
      { userId: userId }, // Find user based on userId
      {
        userId,
        studyType,
        studyPace,
        startDate,
        endDate,
        recommendedHours,
        studyEvents
      },
      { new: true, upsert: true } // Create a new document if it doesn't exist
    );

    res.status(200).json(newPlanner);
  } catch (error) {
    console.error('Error saving planner:', error);
    res.status(500).json({ error: 'Failed to save planner' });
  }
};
