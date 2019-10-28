const mongoose = require('mongoose')
const validator = require('validator')

const profileSchema = new mongoose.Schema({
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
    aboutMe: {
        type: String,
        default: "who are you?"
        // require: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile