import React, {useState, useEffect}  from 'react'
import axios from 'axios'
import "./HomePage.css"
import QuestionCard from "./components/QuestionCard/QuestionCard"
import PostQuestion from "./components/PostQuestion/PostQuestion"

function HomePage() {
    const [data, setData] = useState(
        []
    );

    useEffect(() => {
        fetch('http://localhost:3001/api/question/')
        .then((response)=> response.json())
        .then((response)=> setData(response.data))
        .catch(function(err){
           console.log('Could not fetch the data...');
        });
    }, []);

    return (
        
        <div>
            <div className="topBar">
            <div className="titleHome">
                !!! HOME PAGE !!!
            </div>

            <PostQuestion/>
            </div>
            <div>
                
            </div>
           
            { data ? data.map( aaa => {
               return <QuestionCard 
                username= {aaa.user.username}
                question= {aaa.title}
                questionBrief={aaa.description}
                link = {aaa.hash}
                />
            })
            : 
           <div>No Questions for now</div>
            }
        </div>
    )
}

export default HomePage
