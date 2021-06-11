import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'
import "./PostQuestion.css"

function PostQuestion() {

    let history = useHistory()
    const [searchOpen,setSearchOpen]=useState(false)
    const [question,setQuestion]=useState("")
    const [desc,setDesc]=useState("")

    const refreshValue=()=>{
        setQuestion("")
        setDesc("")
    }

    async function addqns(e){
        e.preventDefault()

        const result = await axios.post(
            'http://localhost:3001/api/question', 
        {
            "title": question,
            "description": desc
        },
        {
                'Content-Type': 'application/json'
            }
            
        ).then((res) => {
            console.log(res.status)

            if (res.data.status === "ok") {
                console.log(res.data.data.hash)
                alert('Success')
                history.push(`/${res.data.data.hash}`)
               
            } else {
                alert(res.data.message)
            }
        })
    }
    // function handle(e) {
    //     const newdata = {...data}
    //     newdata[e.target.id] = e.target.value
    //     setData(newdata)
    //     console.log(newdata)
    // }

    return (
        <>
      <button className="openPost" onClick={()=>setSearchOpen(open=>!open)} >POST A QUESTION</button>
      <div
        className={searchOpen ? 'parameterSearch open' : 'parameterSearch'}
        id="parameterSearchId"
      >
        <p className="searchTitle" id="searchTitleId">
          Fill out Details {' '}
          <button onClick={refreshValue} className="refreshIcon" >Refresh</button>
        </p>

                <div className="hiddenParameters" id="hiddenParametersId">
                    
                    <div className="param">
                            <p>Question or Topic for Discussion</p>
                            <input
                                width="100%"
                                height="4vh"
                                className="paramInput"
                                value={question}
                                onChange={(e)=>setQuestion(e.target.value)}
                            />
                        </div>
                        <div className="param">
                            <p>Describe the issue in detail</p>
                            <textarea
                                rows="17"
                                className="paramtextarea"
                                value={desc}
                                onChange={(e)=>setDesc(e.target.value)}
                            ></textarea>
                        </div>
                        
                        
                    <div className="searchBtn">
                        <button className="searchBtnbutton" onClick = {addqns}>POST</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostQuestion
