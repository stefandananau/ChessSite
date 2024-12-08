import { RegisterAxios, RegisterUser } from '../../ApiCalls/UserCalls.jsx';
import './Register.css';
import React, { useState } from 'react';

export default function Register({linkHandle}){
    const reEmail = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    const reUsername = new RegExp("^[a-zA-Z0-9]{3,20}$");
    const rePassword = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    async function handleRegister(){
        if(!reEmail.test(email)){
            setErrorMessage("*Please enter a valid email");
            setSuccessMessage("")
            return;
        }
        if(!reUsername.test(username)){
            setErrorMessage("*Username should contain 3 to 20 alphanumerical characters");
            setSuccessMessage("")
            return;
        }
        if(!rePassword.test([password])){
            setErrorMessage("*Password should be 8 to 20 characters including a letter a number and a special character");
            setSuccessMessage("")
            return;
        }
        let errormsg = await RegisterAxios(email, password, username)
        /*
        if(errormsg){
            setErrorMessage(`*${errormsg}`);
            setSuccessMessage("")
        }else{
            setErrorMessage("");
            setSuccessMessage("Register Succesful")
        }
        */
    }

    return (
        <div className="register-container">
            <h2>Register</h2>
            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose your username"
                />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
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
                    placeholder="Choose a password"
                />
            </div>
            <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                />
            </div>
            <button onClick={handleRegister} className="register-btn">Register</button>
            <label className='success'>{successMessage}</label>
            <label className='error'>{errorMessage}</label>
            <div className="footer-text">
                <p>Already have an account? 
                    <button className="button-link" onClick= {() => linkHandle("Login")}>
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};