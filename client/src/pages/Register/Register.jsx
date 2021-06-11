
import axios from 'axios'
import React, {useState} from 'react'
import { useHistory } from "react-router-dom"
import "./Register.css"

function Register() {
    let history = useHistory();

    const [data, setData] = useState({
        email: "",
        username: "",
        password:""
    })
    
    async function signup(e){
        e.preventDefault()

        const result = await axios.post(
            'http://localhost:3001/api/register', 
        {
            "email": data.email,
            "username": data.username,
            "password": data.password
        },
        {
                'Content-Type': 'application/json'
            }
            
        ).then((res) => {
            console.log(res.status)

            if (res.data.status === "ok") {
                alert('Success')
                Redirect();
            } else {
                alert(res.data.message)
            }
        })
    }
    function handle(e) {
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }
    function Redirect() {
       history.push('/') 
    }
    

    return (
        <div className="register">
            <form className="registerForm" id="signup-form" onSubmit = {(e) => signup(e)}>
            <h1>Sign Up</h1>
                <input onChange = {(e) => handle(e)}  type="email" id="email" placeholder="Email" value = {data.email} /> <br/><br/>
                <input onChange = {(e) => handle(e)} type="username" id="username" placeholder="Username" value = {data.username}/> <br/><br/>
                <input onChange = {(e) => handle(e)} type="password" id="password" placeholder="Password" value = {data.password}/> <br/><br/>
                <button className="submitBtn" type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register
