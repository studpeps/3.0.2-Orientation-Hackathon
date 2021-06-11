const Question = require('../models/questionModel')
const User = require('../models/userModel')
const { v4: uuidv4 } = require('uuid');

exports.getQuestions = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
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
    res.setHeader('Access-Control-Allow-Origin', '*')
    const { title, description } = req.body;
    if (!title || !description ) throw 'All fields not provided.'
    const user = "60c3bb8f7a3d1b29acf82844"

    let uuidvv = uuidv4()
    let hash = `session#-1${uuidvv}`

    const newQuestion = new Question({
        title,
        description,
        hash,
        user
    })
    await newQuestion.save()

    res.json({
        status: 'ok',
        message: "Questioned successfully.",
        data: newQuestion
    })
}