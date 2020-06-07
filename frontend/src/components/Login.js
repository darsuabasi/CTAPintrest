import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../util/firebaseFunctions';
import { NavLink } from 'react-router-dom';
import '../css/Login.css'


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    // const [error, setError] = useState("")



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await login(email, password);
          history.push("/user-feed");
        } catch (err) {
          alert("Sorry to that man but we don't know him", err);
        }
    };
    
    return (
        <div className="login-form"> 
        {/* <img src="" alt="" class="avatar-image"/> */}
        {/* <AllPins/> */}
            <div className="stylingLoginModaldiv">

                <h1 className="loginhello"> Login </h1>
                <form className="user-form-fill" onSubmit={handleSubmit}> 
                    <input className="login-input" placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        />

                    <br/>
                    <input className="login-input" placeholder="Password" 
                        value={password}
                        autoComplete="on"
                        type="password"
                        onChange={(e) => setPassword(e.currentTarget.value)}

                        /> 


                    <p> Forgot your password? </p>
                    <button className="login-page-button1" type="submit"> Log in </button>

                    <h5> OR </h5>

                    <button className="login-page-button2" type="submit"> Continue with Facebook </button>
                    <br/>
                    <button className="login-page-button3" type="submit"> Continue with Google </button>

                    <p className="otherExtraShit"> By continuing, you agree to Pinterest's Terms of Service, Privacy Policy</p>

                
                    <NavLink className="signup-from-login" exact to={"/signup"}> Not on Pintrest yet? Sign up </NavLink>

                </form>
                
         
            </div>

          

        </div>
    )
};

export default Login;