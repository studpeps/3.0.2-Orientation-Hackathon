import React from 'react'
import './Login.css'

function Login() {

    // Logged()
    //     async function Logged(event) {
    //         const result = await fetch('/api/checkauth', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         }).then((res) => res.json())

    //         if (result.status === 'ok') {
    //             Redirect()
    //         } 
    //         // else {
    //         //     alert(result.message)
    //         // }
    //     }



        async function login(event) {
            event.preventDefault()
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value

            const result = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }).then((res) => res.json())

            if (result.status === 'ok') {
                console.log('Got the token: ', result.token)
                alert('Success')
                Redirect();
            } else {
                alert(result.message)
            }
        }
        function Redirect() {
            window.location.href="/home"
        }
        

    return (
        <div className="login">
        <form className="loginForm" id="login-form">
        <h1>Login</h1>
            <input type="email" id="email" placeholder="Email" /> <br/><br/>
            <input type="password" id="password" placeholder="Password" /> <br/><br/>
            <button className="submitBtn" type="submit" onSubmit={login}>Login</button>
        </form>
        </div>
    )
}

export default Login
