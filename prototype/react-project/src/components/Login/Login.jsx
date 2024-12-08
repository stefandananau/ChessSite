import { LoginUser, LoginAxios } from '../../ApiCalls/UserCalls.jsx';
import './Login.css';
import React, { useState } from 'react';

export default function Login({linkHandle}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function handleLogin(){
        let result = await LoginAxios(email, password);
        console.log(result)
        //linkHandle("Main");
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <div className="input-group">
                <label htmlFor="username">Email</label>
                <input
                    type="text"
                    id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
            </div>
            <button onClick={handleLogin} className="login-btn">Login</button>
            <div className="footer-text">
                <p>Don't have an account? 
                    <button onClick= {() => linkHandle("Register")} className="button-link">
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};