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

    // const { currentUser } = useContext(AuthContext);
    const displayNavForUser = () => {
        if(currentUser) {
            return( 
                <div className="user-navBar">
                
                    <NavLink className="pintrestLogoLetters" to={"/user-feed"}> P </NavLink>
                    <NavLink className="user-nav-feed" to={"/user-feed"}>Home</NavLink>
                    <NavLink className="user-nav-today" to={"/today"}>Today</NavLink>
                    {/* <NavLink className="user-nav-following" to={"/following"}>Following</NavLink> */}
                    <SearchBar className="user-nav-search"> </SearchBar>
                    {/* <NavLink className="user-nav-notify" to={"/notifications"}> Notifications </NavLink> */}
                    <NavLink className="user-nav-message" to={"/messages"}> Messages </NavLink>
                    <NavLink className="user-nav-image" to={"/user-profile/boards"}> <img className="user-nav-image-2" src={API+profilepicture}/> </NavLink>
                    
                        <div className="dropdown"> 
                            <button className="user-nav-accounts" to={"/accounts"}>Accounts</button>
                                <div className="account-dropdown-content">
                                <label className="drop-labels">Accounts</label>
                                    <a href="www.nothing.com"> Add another account </a>
                                    <a href="www.nothing.com"> Add a free business account </a>
                                <label className="drop-labels"> More Options</label>
                                    {/* <NavLink to={"/settings"}> Settings </NavLink> */}
                                    <NavLink to={"/settings"}> Settings </NavLink>
                                    <a href="www.nothing.com"> Tune your home feed </a>
                                    {/* <NavLink to={"/edit"}> Tune your home feed </NavLink> */}
                                    <a href="www.nothing.com"> Install the chrome app </a>
                                    <a href="www.nothing.com"> Get help </a>
                                    <a href="www.nothing.com"> See terms and privacy </a>
                                    <button className="logout-btn-style" onClick={logout}>Logout</button>
                                </div>
                        </div>
 
                    </div>
             )  
        } else {        
            return (
                <div className="non-user-nav">
                    {/* <ul className='pintrestLogoLetters'>P</ul> */}
                    {/* <div className="logo-pin">  */}
                    <NavLink className="pintrestLogoLettersNon" to={"/"}> P </NavLink>
                    {/* </div> */}
                    <NavLink className="publicNavLink" to={"/about"}> About </NavLink>
                    <NavLink className="publicNavLink" to={"/photos-by-uduakabasi"}> Photography </NavLink>
                    <NavLink className="publicNavLogin" id="login" to={"/login"}> Log in</NavLink>
                    <NavLink className="publicNavSignup" id="signup" to={"/signup"}> Sign up</NavLink>
            
              
                    {/* import login */}
                    {/* import signup */}
                </div>
            )
        }
    }
    return (
        <div> 
            <nav className="navbarUno"> 
            {/* <NavLink to={"/"}> Login in</NavLink>   */}
                {displayNavForUser()}
            </nav>
        </div>
    )
}

export default Navbar;



