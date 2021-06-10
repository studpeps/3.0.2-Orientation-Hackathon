import React from 'react'
import "./LandingPage.css"
import { Link } from 'react-router-dom'
import headImg from "../../assests/headImg.jpg"

function LandingPage() {
    return (
        <div>
            <div className="mainLand">
                <div className="textDiv">
                    <div className="descText">
                        <h1>DO YOU ENJOY CODING?</h1>
                        <h1>DO YOU WANT TO MAKE A NEW FRIEND?</h1>
                        <h1>HAVE DIFFICULTY SOLVING SOME COMPUTER-RELATED QUESTIONS?</h1>
                        <p>- Stop procastination, learn with a study buddy</p>
                        <p>- Learn and help people from around the globe</p>
                        <p>- Connect through a collaborative compiler and video chat</p>
                    </div>
                    <img width="700px" height="500px" src={headImg}></img>
                </div>
                <div className="btnDiv">
                <Link to="/login"><button className="inBtn">Sign In</button></Link>
                <Link to="/register"><button className="upBtn">Sign Up</button></Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
