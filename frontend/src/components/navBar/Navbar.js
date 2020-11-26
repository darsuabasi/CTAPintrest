import React, { useContext, useState, useEffect,  } from 'react';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
// import Accounts from '../components/Accounts';
import SearchBar from '../searchFeature/SearchBar';
import { apiURL } from '../../util/apiURL';
import { useInput } from '../../util/useInput';
import { AuthContext } from '../../providers/AuthProvider';
import '../../css/Navbar.css'

import { logout} from '../../util/firebaseFunctions'


const Navbar = () => {

    const { currentUser, token } = useContext(AuthContext);
    const API = apiURL();
    const [userId, setUserId] = useState("");
    const history = useHistory("");
    const [user, setUser] = useState([]);
    const [profilepicture, setProfilePicture] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            // debugger
            try {
            let res = await axios({
                method: "get",
                url: `${API}/api/users/${currentUser.uid}`,
                headers: {
                    AuthToken: token,
                },
            });
            // debugger
            setUserId(res.data.getUser.id);
            setUser(res.data.getUser);
            setProfilePicture(res.data.getUser.profilepic);
            } catch (err) {
                console.log(err.message)
            }
        };
        fetchUser();
    }, []);

    const displayNavForUser = () => {
        if(currentUser) {
            return (
                <div className="user-navBar">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">

                    {/* <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button> */}

                        <NavLink className="pintrestLogoLetters" to={"/user-feed"}> P </NavLink>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav">

                                <li class="nav-item active">
                                    <NavLink class="nav-link" className="user-nav-feed" to={"/user-feed"}>Home <span class="sr-only">(current)</span> </NavLink>
                                </li>
                                        
                                <li class="nav-item">
                                    <NavLink class="nav-link" className="user-nav-today" to={"/today"}>Today</NavLink>
                                </li>

                                <SearchBar className="user-nav-search"> </SearchBar>

                                {/* <form class="form-inline my-2 my-lg-0">
                                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form> */}


                                <li class="nav-item">
                                    <NavLink class="nav-link messages" className="user-nav-message" to={"/messages"}> Messages </NavLink>
                                </li>

                                <li class="nav-item">
                                    <NavLink className="user-nav-image" to={"/user-profile/boards"}> <img className="user-nav-image-2" src={API+profilepicture}/> </NavLink> 
                                </li>


                                <div className="dropdown"> 
                                    <button className="user-nav-accounts" to={"/accounts"}>Accounts</button>
                                    
                                    <div className="account-dropdown-content">
                                        <label className="drop-labels">ACCOUNTS</label>
                                            <a href="www.nothing.com"> Add another account </a>
                                            <a href="www.nothing.com"> Add a free business account </a>
                                        <label className="drop-labels"> MORE OPTIONS</label>
                                   
                                            <NavLink to={"/settings"}> Settings </NavLink>
                                            <a href="www.nothing.com"> Tune your home feed </a>
                                         
                                            <a href="www.nothing.com"> Install the chrome app </a>
                                            <a href="www.nothing.com"> Get help </a>
                                            <a href="www.nothing.com"> See terms and privacy </a>
                                            <button className="logout-btn-style" onClick={logout}>Logout</button>
                                    </div>
                                </div>

                            </ul>
                        </div>
                    </nav>


                </div>
            )
        } else {
            return (
                <div className="non-user-nav">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        {/* <a class="navbar-brand" href="#">Pinterest</a> */}
                        <NavLink class="navbar-brand" /*className="pintrestLogoLettersNon"*/ to={"/"}> PINTEREST </NavLink>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav mr-auto">


                                    <li class="nav-item active">
                                        <NavLink /*class="nav-link"*/ className="publicNavLink" to={"/about"}> About </NavLink>
                                        {/* <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> */}
                                    </li>
                                    
                                    <li class="nav-item">
                                        <NavLink className="publicNavLink" to={"/photos-by-uduakabasi"}> Photography </NavLink>
                                        {/* <a class="nav-link" href="#">Link</a> */}
                                    </li>

                                    <li class="nav-item">
                                        <NavLink className="publicNavLogin" id="login" to={"/login"}> Log In</NavLink>
                                        {/* <a class="nav-link" href="#">Link</a> */}
                                    </li>

                                    <li class="nav-item">
                                        <NavLink className="publicNavSignup" id="signup" to={"/signup"}> Sign Up</NavLink>
                                        {/* <a class="nav-link" href="#">Link</a> */}
                                    </li>

                                        {/* <li class="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                 Dropdown
                                             </a>
                                                 <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                   <a class="dropdown-item" href="#">Action</a>
                                                    <a class="dropdown-item" href="#">Another action</a>
                                                        <div class="dropdown-divider"></div>
                                                            <a class="dropdown-item" href="#">Something else here</a>
                                                    </div>
                                        </li> */}
                                </ul>
                            </div>

                    </nav>

                </div>
            )
        }
    }

    return (
        <div> 
            <nav className="navbarUno"> 
                {displayNavForUser()}
            </nav>
        </div>
    )
}

export default Navbar
