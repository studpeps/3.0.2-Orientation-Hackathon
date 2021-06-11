import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom"
import './Login.css'

function Login() {
    let history = useHistory();

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    // Logged()

    async function Logged() {
        console.log(localStorage.getItem('token'))
        const result = await axios.post('http://localhost:3001/api/checkauth',
            {
                "token": localStorage.getItem('token')
            },
            {
                'Content-Type': 'application/json'

            }).then((res) => {
                console.log(res)
                if (res.data.message === "Authenticated") {
                    console.log('Success')
                    Redirect()
                }
                else {
                    console.log(res.data.message)
                }
            })
    }


    async function login(e) {
        e.preventDefault()

        const result = await axios.post(
            'http://localhost:3001/api/login',
            {
                "email": data.email,
                "password": data.password
            },
            {

                'Content-Type': 'application/json'
            }

        ).then((res) => {
            console.log(res.status)

            if (res.data.status === "ok") {
                console.log('Got the token: ', res.data.token)
                localStorage.setItem('token', res.data.token)
                alert('Success')
                Redirect();
            } else {
                alert(res.data.message)
            }
        })

        // if (result.status === 'ok') {
        //     console.log('Got the token: ', result.token)
        //     alert('Success')
        //     Redirect();
        // } else {
        //     alert(result.message)
        // }
    }
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }
    function Redirect() {
        history.push('/home')
    }


    return (
        <div className="login">
            <form className="loginForm" id="login-form" onSubmit={(e) => login(e)}>
                <h1>Login</h1>
                <input onChange={(e) => handle(e)} type="email" id="email" placeholder="Email" value={data.name} /> <br /><br />
                <input onChange={(e) => handle(e)} type="password" id="password" placeholder="Password" value={data.password} /> <br /><br />
                <button className="submitBtn" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
