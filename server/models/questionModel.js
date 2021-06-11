const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required.",
    },
    description: {
        type: String,
        required: "Description is required.",
    },
    hash: {
        type: String,
        required: "Hash is required.",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: "User is required.",
    },
},
    {
        timestamps: true
    },
)

const Question = mongoose.model('question', questionSchema)

module.exports = Question