import React, { useContext } from 'react';
// import axios from 'axios';
import { NavLink } from 'react-router-dom';
// import Accounts from '../components/Accounts';
import SearchBar from './SearchBar'
import { AuthContext } from '../providers/AuthProvider';
import '../css/Navbar.css'

import { logout} from '../util/firebaseFunctions'


const Navbar = (params) => {

    const { currentUser } = useContext(AuthContext);
    const displayNavForUser = () => {
        if(currentUser) {
            return( 
                <div className="user-navBar">
                    <NavLink className="pintrestLogoLetters" to={"/user-feed"}> P </NavLink>
                    <NavLink className="user-nav-feed" to={"/user-feed"}>Home</NavLink>
                    <NavLink className="user-nav-today" to={"/today"}>Today</NavLink>
                    <NavLink className="user-nav-following" to={"/following"}>Following</NavLink>
                    <SearchBar className="user-nav-search"> </SearchBar>
                    <NavLink className="user-nav-notify" to={"/notifications"}> Notifications </NavLink>
                    <NavLink className="user-nav-message" to={"/messages"}> Messages </NavLink>
                    <NavLink className="user-nav" to={"/user-profile/boards"}> ProfilePic </NavLink>
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
                                    <button onClick={logout}>Logout</button>
                            

                    </div>
                    </div>
                    {/* <button onClick={logout}>Logout</button> */}
                 </div>
             )  
        } else {        
            return (
                <div className="non-user-nav">
                    {/* <ul className='pintrestLogoLetters'>P</ul> */}
                    {/* <div className="logo-pin">  */}
                    <NavLink className="pintrestLogoLettersNon" to={"/"}> P </NavLink>
                    {/* </div> */}
                    <NavLink className="publicNavLink" to={"https://about.pinterest.com/en"}> About </NavLink>
                    <NavLink className="publicNavLink" to={"https://business.pinterest.com/"}> Business</NavLink>
                    <NavLink className="publicNavLink" to={"https://newsroom.pinterest.com/en"}> Blog </NavLink>
                    <NavLink className="publicNavLogin" id="login" to={"/login"}> Log in</NavLink>
                    <NavLink className="publicNavSignup" id="signup" to={"/signup"}> Sign up</NavLink>
            
              
                    {/* import login */}
                    {/* import signup */}
                </div>
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
            {/* <NavLink to={"/"}> Login in</NavLink>   */}
                {displayNavForUser()}
            </nav>
        </div>
    )
}

export default Navbar;



