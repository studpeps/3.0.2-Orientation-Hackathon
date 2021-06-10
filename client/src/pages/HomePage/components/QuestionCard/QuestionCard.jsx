import React from 'react'
import "./QuestionCard.css"

function QuestionCard(props) {
    return (
        <div className="qcard">
            <p className="quser">{props.username}</p>
            <div className="question">
            <div className="qtext">
                <h3>{props.question}</h3>
                <p>{props.questionBrief}</p>
            </div>
            <button className="join">Meet and Discuss</button>
            </div>
        </div>
    )
}

export default QuestionCard
