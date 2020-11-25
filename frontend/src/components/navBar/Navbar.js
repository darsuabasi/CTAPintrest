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
                    <h1> Hello owrld</h1>

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
            {/* <NavLink to={"/"}> Login in</NavLink>   */}
                {displayNavForUser()}
            </nav>
        </div>
    )







//     return (
//         <div>
//             <nav class="navbar navbar-expand-lg navbar-light bg-light">
//                 <a class="navbar-brand" href="#">Navbar</a>
//                 <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span class="navbar-toggler-icon"></span>
//                 </button>

//                 <div class="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul class="navbar-nav mr-auto">
//                     <li class="nav-item active">
//                         <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
//                     </li>
//                     <li class="nav-item">
//                         <a class="nav-link" href="#">Link</a>
//                     </li>
//                     <li class="nav-item dropdown">
//                         <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                         Dropdown
//                         </a>
//                         <div class="dropdown-menu" aria-labelledby="navbarDropdown">
//                         <a class="dropdown-item" href="#">Action</a>
//                         <a class="dropdown-item" href="#">Another action</a>
//                         <div class="dropdown-divider"></div>
//                         <a class="dropdown-item" href="#">Something else here</a>
//                         </div>
//                     </li>
//                     <li class="nav-item">
//                         <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
//                     </li>
//                     </ul>
//                     <form class="form-inline my-2 my-lg-0">
//                     <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
//                     <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//                     </form>
//                 </div>
// </nav>

//     </div>
//     )
}

export default Navbar
