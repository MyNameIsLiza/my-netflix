import './Login.css';
import React from 'react';

function Login() {
    return (
        <form className="Login" id="loginForm">
            <div className="loginDiv">
                <label htmlFor="loginInput">Email</label>
                <input type="email" id="loginInput"/>
            </div>
            <div className="passwordDiv">
                <label htmlFor="loginInput">Password</label>
                <input type="password" id="passwordInput"/>
            </div>
            <input type="submit" value="Log In"/>
        </form>
    );

}

export default Login;
