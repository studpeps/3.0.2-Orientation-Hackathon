import React, { useState } from 'react'
import "./PostQuestion.css"

function PostQuestion() {
    const [searchOpen,setSearchOpen]=useState(false)
    const [question,setQuestion]=useState("")
    const [desc,setDesc]=useState("")

    const refreshValue=()=>{
        setQuestion("")
        setDesc("")
    }

    return (
        <>
      <button className="openPost" onClick={()=>setSearchOpen(open=>!open)} >GOT A QUESTION?</button>
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
                        <button className="searchBtnbutton">POST</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostQuestion
