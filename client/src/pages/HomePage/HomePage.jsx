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
            username='Kadd' 
            question="Can you help me build my project to get it ready for production?" 
            questionBrief="So I have just finished creating an awesome react project but I'm not sure how to deploy it"
            />
            <QuestionCard 
            username='John' 
            question="What is asynchronous code" 
            questionBrief="people keep talking about it but I'm not sure exactly what it is"
            />
            <QuestionCard 
            username='Kera' 
            question="What is a promise? and how to use it?" 
            questionBrief="I need help with JS promises"
            />
            <QuestionCard 
            username='Jason' 
            question="Any library to use a rich text editor in react?" 
            questionBrief="I need a text editor that provides WYSIWYG functionality"
            />
            <QuestionCard 
            username='Tim' 
            question="Can anyone help me reverse a linkedList" 
            questionBrief="This is to hard!"
            />
          
        </div>
    )
}

export default HomePage
