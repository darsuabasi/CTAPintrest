import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../util/firebaseFunctions';
import { NavLink } from 'react-router-dom';
import '../../css/Login.css'


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
          alert("Not able to log in. Please try again.", err);
        }
    };
    
    return (
        <div className="main-login">

            <div className="login-form"> 
        {/* <img src="" alt="" class="avatar-image"/> */}
        {/* <AllPins/> */}
                <div className="stylingLoginModaldiv">

                    <h3 className="loginhello"> Login </h3>
                    {/* <img src="https://uploads-ssl.webflow.com/5b6211ba5092559da8382511/5b648d6d78f5c51c8d26a519_eye-backer.svg" width="100" data-w-id="d15526f0-7493-bf68-95fa-f12634007609" style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(1.0305deg, 0deg); transform-style: preserve-3d; will-change: transform;" alt="" class="eye-image-back"/>
                    <img src="https://uploads-ssl.webflow.com/5b6211ba5092559da8382511/5b6498b6c899f52c5db733b2_eye-backer-back.svg" width="100" alt="" class="image-3"/> */}
                    <form className="user-form-fill" onSubmit={handleSubmit}> 
                        <input className="login-input1" placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            />

                        <br/>
                        <input className="login-input2" placeholder="Password" 
                            value={password}
                            autoComplete="on"
                            type="password"
                            onChange={(e) => setPassword(e.currentTarget.value)}

                            /> 


                        {/* <p> Forgot your password? </p> */}
                        <div>
                        <button className="login-page-button1" type="submit"> Log in </button>
                        <div class="sun"></div>
                        </div>
                    

                        {/* <h5> OR </h5> */}

                        {/* <button className="login-page-button2" type="submit"> Continue with Facebook </button>
                        <br/>
                        <button className="login-page-button3" type="submit"> Continue with Google </button> */}

                        <p className="otherExtraShit"> By continuing, you agree to Pinterest's Terms of Service, Privacy Policy</p>

                    
                        <NavLink className="signup-from-login" exact to={"/signup"}> Not on Pintrest yet? Sign up </NavLink>
                    </form> 
                </div>
            </div>
        </div>
        
    )
};

export default Login;