import mongoose from 'mongoose';

const plannerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studyType: {
        type: String,
        required: true,
        trim: true
    },
    studyPace: {
        type: Number,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    recommendedHours: {
        type: Number,
        required: true
    },
    studyEvents: [
        {
            summary: {
                type: String,
                required: true,
                trim: true
            }, location: {
                type: String,
                required: true,
                trim: true
            }, description: {
                type: String,
                required: true,
                trim: true
            }, startDate: {
                type: Date,
                required: true
            }, endDate: {
                type: Date,
                required: true
            }, startTime: {
                type: String,
                required: true,
                trim: true
            }, endTime: { 
                type: String,
                required: true,
                trim: true 
            }, startDateTime: { 
                type: Date,
                required: true
            }, endDateTime: { 
                type: Date,
                required: true
            },
            isStudySession: { 
                type: Boolean,
                default: false
                    }
                }
        ]
    },
        { timestamps: true }
);

    const Planner = mongoose.model('Planner', plannerSchema);
    export default Planner;