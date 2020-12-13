import React, { useContext, useState, useEffect,  } from 'react';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
// import Accounts from '../components/Accounts';
import SearchBar from '../searchFeature/SearchBar';
import { apiURL } from '../../util/apiURL';
import { useInput } from '../../util/useInput';
import { AuthContext } from '../../providers/AuthProvider';
import '../../css/Navbar.css'
// import { logout} from '../../util/firebaseFunctions';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import wave from '../../assets/wave.svg'


import { login, demoLogin, signUp, logout } from '../../util/firebaseFunctions';
// import { signUp } from '../../util/firebaseFunctions';


const Navbar = () => {

    const { currentUser, token } = useContext(AuthContext);
    const API = apiURL();
    const [userId, setUserId] = useState("");
    const history = useHistory("");
    const [user, setUser] = useState([]);
    const [profilepicture, setProfilePicture] = useState("");
    // login
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // signup
    const [emailSignup, setEmailSignup] = useState("");
    const [passwordSignup, setPasswordSignup] = useState("");
    const userName = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const bio = useInput("");
    // const profilePic = useInput("");
    const [file, setFile] = useState({preview: "", raw: ""});
    // const age = useInput("");
    const [userSignup, setUserSignup] = useState([]);



    const onSelectImage = (e) => {
        if (e.target.files.length) {
            setFile({
              preview: URL.createObjectURL(e.target.files[0]),
              raw: e.target.files[0]
            });
          }
    }


    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
          await login(email, password);
          history.push("/user-feed");
        } catch (err) {
          alert("Not able to log in. Please try again.", err);
        }
    };

    

    const handleNewUser = async (e) => {
        debugger
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append("myImage", file.raw);
            formData.append("file", file.preview);
            formData.append("email", emailSignup);
            formData.append("username", userName.value);
            formData.append("first_name", firstName.value);
            formData.append("last_name", lastName.value);
            formData.append("bio", bio.value);
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }
            try {
                let res = await signUp(emailSignup, passwordSignup);
                formData.append("id", res.user.uid);
            await axios.post(`${API}/api/users`, formData, config)
            } catch (err) {
                console.log(err)
            }
        } catch (err) {
            console.log(err)
        }
};

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
                            <ul class="navbar-nav user2">

                                <li class="nav-item active two">
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
                        <NavLink /*class="navbar-brand"*/ className="pintrestLogoLettersNon" to={"/"}> PINTEREST </NavLink>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav mr-auto sendToEnd">

                                    <li class="nav-item active">
                                        <NavLink class="nav-link publicNavLink" className="publicNavLink" to={"/about"}> About </NavLink>
                                        {/* <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> */}
                                    </li>
                                    
                                    <li class="nav-item">
                                        <NavLink class="nav-link publicNavLink" className="publicNavLink" to={"/photos-by-uduakabasi"}> Photography </NavLink>
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


<li class="nav-item"> 
    <button className="publicNavLogin" variant="primary" onClick={handleShow}>
        Login
      </button>
</li>
      <div className="main-login">
      <Modal className="fullModal" show={show} onHide={handleClose}>
      
        <Modal.Header closeButton>
          {/* <Modal.Title className="modaltitle1">Welcome to Lifetrest!</Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="modalbody1">
        {/* <div className="main-login"> */}
        <div className="login-form"> 
                <div className="stylingLoginModaldiv">
                    <h3 className="loginhello"> Welcome to Lifetrest! </h3>
                        <form className="user-form-fill" onSubmit={handleLoginSubmit}> 
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

                        <Button style={{color:"#ffffff", backgroundColor:"#E60023", border:"none", height:"2rem"}} bsstyle="primary" onClick={demoLogin}>
                            Demo Login
                        </Button>
                        {/* <h5> OR </h5> */}

                        {/* <button className="login-page-button2" type="submit"> Continue with Facebook </button>
                        <br/>
                        <button className="login-page-button3" type="submit"> Continue with Google </button> */}
                    </form> 
                </div>
            </div>
            <img src={wave}/>
        {/* </div> */}
        </Modal.Body>
        <Modal.Footer>
            <p className="otherExtraShit"> By continuing, you agree to Pinterest's Terms of Service, Privacy Policy</p>
            <NavLink className="signup-from-login" exact to={"/signup"}> Not on Pintrest yet? Sign up </NavLink>
        </Modal.Footer>
      </Modal>
      </div>



       <li class="nav-item">
         <NavLink className="publicNavSignup" id="signup" to={"/signup"}> Sign Up</NavLink>
            </li> 


                            </div>

                    </nav>

                </div>
            )
        }
    }

    return (
        <div> 
            {/* <nav className="navbarUno">  */}
                {displayNavForUser()}
            {/* </nav> */}
        </div>
    )
}

export default Navbar
