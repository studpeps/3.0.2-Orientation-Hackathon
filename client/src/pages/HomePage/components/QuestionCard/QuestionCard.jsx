import React from 'react'
import "./QuestionCard.css"
import { useHistory } from "react-router-dom"

function QuestionCard(props) {
    let history = useHistory()

    function gomeet(){
        history.push(props.link)
    }

    return (
        <div className="qcard">
            <p className="quser">{props.username}</p>
            <div className="question">
            <div className="qtext">
                <h3>{props.question}</h3>
                <p>{props.questionBrief}</p>
            </div>
            <button className="join" onClick = { gomeet }>Meet and Discuss</button>
            </div>
        </div>
    )
}

export default QuestionCard
