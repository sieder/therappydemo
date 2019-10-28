const mongoose = require('mongoose')
const validator = require('validator')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    content: {
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

const Post = mongoose.model('Post', postSchema)

module.exports = Post