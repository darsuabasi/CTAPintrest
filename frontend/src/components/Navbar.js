import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Navbar.css'
// import SearchBar from '../components/SearchBar'
import { AuthContext } from '../providers/AuthContext'
import Accounts from '../components/Accounts'
import { logout } from '../util/firebaseFunctions';
import LoginModal from './LoginModal';
// import SignupModal from './SignupModal';
// import Modal from './modal/Modal'

import { login } from '../util/firebaseFunctions'
import { apiURL } from '../util/apiURL';
import { signup } from '../util/firebaseFunctions'


import { useHistory } from 'react-router-dom';

import axios from 'axios';
import SearchBar from './SearchBar'





const Navbar = (params) => {

    // for signup modal 
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [openSignupModal, setOpenSignupModal] = useState(false);
    // const [age, setAge] = useState([]);
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
            history.push("/user-feed")
        } catch (err) {
            setError(err.message)
        }
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password)
            history.push("/user-feed")
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

    //         const grabSignupClick = document.addEventListener('click', handleSignupClick)
    //         return () => {
    //             grabSignupClick();
    //         }
    // }, [])


    const { currentUser } = useContext(AuthContext);
    const displayNavForUser = () => {
        if(!currentUser) {
            return( 
            // <button onClick={logout}>Logout</button>;
                <>
                    <NavLink className="user-nav" to={"/user-feed"}>Home</NavLink>
                    <NavLink className="user-nav" to={"/today"}>Today</NavLink>
                    <NavLink className="user-nav" to={"/following"}>Following</NavLink>
                        {/* <div className="user-nav-search"> */}
                            <SearchBar className="user-nav-search"> </SearchBar>
                        {/* </div> */}
                    <NavLink className="user-nav" to={"/notifications"}> Notifications </NavLink>
                    <NavLink className="user-nav" to={'/messages'}> Messages </NavLink>
                    <NavLink className="user-nav" to={"/user-profile/boards"}> ProfilePic </NavLink>
                    {/* <NavLink>Accounts</NavLink> */}
                    <button onClick={logout}>Logout</button>
                 </>
             )  
        } else {        
            return (
                <>
                    <NavLink className="publicNavLink" to={"https://about.pinterest.com/en"}> About </NavLink>
                    <NavLink className="publicNavLink" to={"https://business.pinterest.com/"}> Business</NavLink>
                    <NavLink className="publicNavLink" to={"https://newsroom.pinterest.com/en"}> Blog </NavLink>
                    <button component={LoginModal}> Log in</button>
                    <button> Sign up</button>
                    {/* import login */}
                    {/* import signup */}
                </>
            )
        }
        // return(
        //     <nav>
        //         <div> 
        //             <i class="icon ion-md-menu"> </i>
        //             <i class="icon ion-md-close"> </i>
        //         </div>

        //         <a href="www.refreshuser.com" class="logo">  
        //             <i class="pintrest-logo"> </i>
        //         </a>

        //         <ul className="full-nav-list">

        //             <li>
        //                 <NavLink to={"/user-home"}>Home</NavLink>
        //             </li>

        //             <li>
        //             <NavLink className="publicNavLink" to={"https://business.pinterest.com/"}> Business</NavLink>
        //             </li>

        //             <li>
        //                 <NavLink className="publicNavLink" to={"https://newsroom.pinterest.com/en"}> Blog </NavLink>
        //             </li>

        //             <li>
        //                 {/* import login */}
        //             </li>

        //             <li>
        //                 {/* import signup */}
        //             </li>

        //             <li>
        //                 <NavLink to={"/user-home"}>Home</NavLink>
        //             </li>

        //             <li>
        //                 <NavLink to={"/today"}>Today</NavLink>  
        //             </li>

        //             <li>
        //                 <NavLink to={"/following"}>Following</NavLink>
        //             </li>

        //             <li>
        //                 {/* <SearchBar/> */}
        //             </li>

        //             <li>
        //                 <NavLink to={"/notifications"}> Notifications </NavLink>
        //             </li>

        //             <li>
        //                 <NavLink to={'/messages'}> Messages </NavLink>
        //             </li>

        //             <li>
        //                 <NavLink to={"/user/boards"}> ProfilePic </NavLink>
        //             </li>

        //             <li>
        //                 <button> DD-Arrow</button>
        //                 <ul className="menu-of-dropDown">
        //                     <label> Accounts </label>
        //                     <li>
        //                         <button> Add another account </button>
        //                     </li>

        //                     <li>
        //                         <button> Add a free business account </button>
        //                     </li>

        //                     <label> More Options</label>

        //                     <li>
        //                         <NavLink to={"/settings"}> Settings </NavLink>
        //                     </li>

        //                     <li>
        //                         <NavLink to={"/edit"}> Tune your home feed </NavLink>
        //                     </li>

        //                     <li>
        //                         <button> Install the chrome app </button>
        //                     </li>

        //                     <li>
        //                         <a href="https://www.askforhelp.com"> Get help </a>
        //                     </li>

        //                     <li>
        //                         <a href="https://www.seeaboutprivacy.com"> See terms and privacy </a>
        //                     </li>

        //                     <li>
        //                         <button onClick={logout}>Logout</button>
        //                     </li>
        //                 </ul>
        //             </li>
        //         </ul>    
        //     </nav>

        // )

            
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



