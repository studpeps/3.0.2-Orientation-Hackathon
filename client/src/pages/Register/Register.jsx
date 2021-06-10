import React from 'react'
import "./Register.css"

function Register() {

    
    // Logged()
    // async function Logged(event) {
    //     const result = await fetch('/api/checkauth', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     }).then((res) => res.json())

    //     if (result.status === 'ok') {
    //         location.assign('./page.html');
    //     } 
    //     // else {
    //     //     alert(result.message)
    //     // }
    // }

    async function registerUser(event) {
        event.preventDefault()
        const email = document.getElementById('email').value
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value

        const result = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                username,
                password
            })
        }).then((res) => res.json())

        if (result.status === 'ok') {
            alert('Success')
            Redirect()
        } else {
            alert(result.message)
            console.log(result.message)
        }
    }
    function Redirect() {
        window.location = "/home";
    }

    return (
        <div className="register">
            <form className="registerForm" id="signup-form">
            <h1>Sign Up</h1>
                <input type="email" id="email" placeholder="Email" /> <br/><br/>
                <input type="username" id="username" placeholder="Username" /> <br/><br/>
                <input type="password" id="password" placeholder="Password" /> <br/><br/>
                <button className="submitBtn" type="submit" onSubmit={registerUser}>Register</button>
            </form>
        </div>
    )
}

export default Register
