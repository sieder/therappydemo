const mongoose = require('mongoose')
const validator = require('validator')

const therapistSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        // require: true
    },
    language: {
        type: Number,
        //1 = English 2 = Arabic
    },
    servicesOffered: {
        type: Number,
        //1 - chat 2-chat&videocall 3-chat,videocall,audiocall
    },
    specialties: {
        type: String
    },
    hourlyRate: {
        type: Number
    },
    aboutMe: {
        type: String
    }
}, {
    timestamps: true
})

therapistSchema.virtual('feedback', {
    ref: 'Feedback',
    localField: '_id',      //reference for the relationship from User to Profile
    foreignField: 'owner'
})



const Therapist = mongoose.model('Therapist', therapistSchema)

module.exports = Therapist