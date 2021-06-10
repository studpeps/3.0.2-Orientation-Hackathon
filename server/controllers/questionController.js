const Question = require('../models/questionModel')
const User = require('../models/userModel')

exports.getQuestions = async (req, res) => {
    const allQuestions = await Question.find({})
    .sort( { _id: -1 } )
    .populate( {path: 'user', select: 'username'} ).exec()
    if (!allQuestions || allQuestions.length === 0) throw "No Questions found";

    res.json({
        status: 'ok',
        data: allQuestions
    })
}

exports.addQuestion = async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description ) throw 'All fields not provided.'
    const user = req.payload.id

    const newQuestion = new Question({
        title,
        description,
        user
    })
    await newQuestion.save()

    res.json({
        status: 'ok',
        message: "Questioned successfully.",
        data: newQuestion
    })
}