import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Navbar.css'
// import SearchBar from '../components/SearchBar'
import { AuthContext } from '../providers/AuthContext'
// import Accounts from '../components/Accounts'
import { logout } from '../util/firebaseFunctions';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import Modal from './modal/Modal'

import { login } from '../util/firebaseFunctions'
import { useHistory } from 'react-router-dom';

import { apiURL } from '../util/apiURL';
import { signup } from '../util/firebaseFunctions'
import axios from 'axios';



const Navbar = (params) => {

    // for signup modal 
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [openSignupModal, setOpenSignupModal] = useState(false);
    const [age, setAge] = useState([]);
    const outsideSignupModal = useRef();
    const API = apiURL();

    // for login modal 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const outsideLoginModal = useRef();


    // for both login and sigup modal
    const history = useHistory();
    const [error, setError] = useState(null);

    


    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await signup(email, password);
            await axios.post(`${API}/api/users`, {id: res.user.uid, email})
            history.push("/")
        } catch (err) {
            setError(err.message)
        }
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password)
            history.push("/")
        } catch (err) {
            setError(err.message)
        }
    }

    const handleLoginClick = (e) => {
        e.preventDefault();
        if(outsideLoginModal.current.contains(e.target)) {
            return 
        }
        setOpenLoginModal(false)
    }

    const handleSignupClick = (e) => {
        e.preventDefault();
        if(outsideSignupModal.current.contains(e.target)) {
            return 
        }
        setOpenLoginModal(false)
    }

    // useEffect(() => {
    //     const grabLoginClick = document.addEventListener('click', handleLoginClick)
    //     return () => {
    //         grabLoginClick();
    //     }

            // const grabSignupClick = document.addEventListener('click', handleSignupClick)
            // return () => {
            //     grabSignupClick();
            // }
    // }, [])


    const { currentUser } = useContext(AuthContext);

    const displayNavForUser = () => {
        if(currentUser) {
            // return <button onClick={accounts}>Accounts</button>;
            return ( 
                <nav>

                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/today"}>Today</NavLink>
                <NavLink to={"/following"}>Following</NavLink>
                {/* <SearchBar/> */}
                <NavLink to={"/notifications"}> Notifications </NavLink>
                <NavLink to={'/messages'}> Messages </NavLink>
                <NavLink to={"/user/boards"}> ProfilePic </NavLink>
                {/* <NavLink to={"accounts"}> AccountStuff</NavLink> */}  
                <button onClick={logout}>Logout</button>
            </nav>
            )
        } else {
            return(
                <nav className="publicNav">
                    <NavLink className="publicNavLink" to={"https://about.pinterest.com/en"}> About </NavLink>
                    <NavLink className="publicNavLink" to={"https://business.pinterest.com/"}> Business</NavLink>
                    <NavLink className="publicNavLink" to={"https://newsroom.pinterest.com/en"}> Blog </NavLink>
                    <div className="buttonDiv">
                        {/* <button className="publicNavLogin" to={"/login"}> Log in</button> */}
                        
                        
                        <button className="publicNavLogin" onClick={() => setOpenLoginModal(!openLoginModal)}> Log in</button>
                        {openLoginModal ? (
                          <div className="stylingLoginModaldiv">
                            <h1> Pintrest logo</h1>
                            <h1> Welcome to Pintrest</h1>
                            <form onSubmit={handleLoginSubmit}> 
                                <input placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                                />

                            <input placeholder="Password" 
                                value={password}
                                autoComplete="on"
                                type="password"
                                onChange={(e) => setPassword(e.currentTarget.value)}
                                /> 

                            <p> Forgot your password? </p>
                            <button type="submit"> Log in </button>

                            <h5> OR </h5>

                            <button type="submit"> Continue with Facebook </button>
                            <button type="submit"> Continue with Google </button>

                            <p> By continuing, you agree to Pinterest's Terms of Service, Privacy Policy</p>

                            <p> Not on Pintrest yet? Sign up</p>

                            </form>
                         </div>
                            ): null}

                        <button className="publicNavSignup" onClick={() => setOpenSignupModal(!openSignupModal)}> Sign up </button>
                        {openSignupModal ? (
                            <div className="stylingSignupModalDiv"> 
                                <h1> Pintrest logo</h1>
                                <h2> Welcome to Pintrest </h2>
                                <h4> Find new ideas to try</h4>
                                {error ? <div> {error} </div> : null}

                                <form onSubmit={handleSignupSubmit}> 
                                    <input placeholder="Email" 
                                        value={signUpEmail}
                                        onChange={(e) => setSignUpEmail(e.currentTarget.value)}
                                    />

                                <input placeholder="Password" 
                                    value={signupPassword}
                                    autoComplete="on"
                                    type="password"
                                    onChange={(e) => setSignupPassword(e.currentTarget.value)}
                                    /> 

                                <input placeholder="Age" 
                                    value={age}
                                    onChange={(e) => setAge(e.currentTarget.value)}
                                    />

                                <button type="submit"> Continue </button>

                                <h5> OR </h5>

                                <button type="submit"> Continue with Facebook </button>
                                <button type="submit"> Continue with Google </button>

                                <p> By continuing, you agree to Pinterest's Terms of Service, Privacy Policy</p>

                                <p> Already a member? Log in</p>

                                <p> Create a business account</p>

                            </form>
                         </div>
                            ): null}
                    </div>
                </nav>
            )
        }
    }
    return (
        <div> 
            <nav className="navbarUno">
                <ul className='pintrestLogoLetters'>Pintrest</ul>
                {displayNavForUser()}
            </nav>
        </div>
    )
}

export default Navbar;



