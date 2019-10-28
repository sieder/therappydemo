const mongoose = require('mongoose')
const validator = require('validator')

const feedbackSchema = new mongoose.Schema({
    feedback: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Therapist'
    }
}, {
    timestamps: true
})

const Feedback = mongoose.model('Feedback', feedbackSchema)

module.exports = Feedback