import React from 'react'
import "./HomePage.css"
import QuestionCard from "./components/QuestionCard/QuestionCard"
import PostQuestion from "./components/PostQuestion/PostQuestion"

function HomePage() {

    return (
        <div>
            <div className="topBar">
            <div className="titleHome">
                !!! HOME PAGE !!!
            </div>
            <PostQuestion/>
            </div>
            <QuestionCard 
            username='sdfgh' 
            question="Why is react cool?" 
            questionBrief="fhow i this helping is it great acanvjczhhhhhkrdfhshggfjn"
            />
        </div>
    )
}

export default HomePage
