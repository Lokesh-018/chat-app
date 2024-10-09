import React, { useState } from 'react'
import './Login.css'
import assets from '../../assets/assets'
import { signup, login, resetPass } from '../../config/firebase'

const Login = () => {

    const [currState, setCurrState] = useState("Sign Up")

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (currState === "Sign Up") {
            signup(userName, email, password);
        }
        else {
            login(email, password);
        }
    }


    return (
        <div className='login'>
            <img src={assets.logo_big} alt="" className="logo" />
            <form onSubmit={onSubmitHandler} className="login-form">
                <h2>{currState}</h2>
                {currState === "Sign Up" ? <input onChange={(e) => setUserName(e.target.value)} value={userName} type="text" placeholder='User Name' className="form-input" required /> : null}
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email Address' className="form-input" required />
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' className="form-input" required />
                <div className="login-term">
                    <input type="checkbox" required />
                    <p>I agree to the terms of use & privacy policy.</p>
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-forgot">
                    {
                        currState === "Sign Up"
                            ? <p className="login-toggle">Already have an account  <span onClick={() => setCurrState("Login")}>Login here</span></p>
                            : <p className="login-toggle">Create an account  <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    }
                    {currState === "Login"
                        ? <p className="login-toggle">Forgot Password  <span onClick={() => resetPass(email)}>Reset here</span></p>
                        : null}
                </div>
            </form>
        </div>
    )
}

export default Login