import React, { useContext, useState, useEffect,  } from 'react';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import SearchBar from '../searchFeature/SearchBar';
import { apiURL } from '../../util/apiURL';
import { useInput } from '../../util/useInput';
import { AuthContext } from '../../providers/AuthProvider';
import '../../css/Navbar.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import wave from '../../assets/wave.svg';
import { login, demoLogin, signUp, logout } from '../../util/firebaseFunctions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from "../../firebase";
import itsme from '../../assets/itsme.jpeg'



const Navbar = () => {

    const { currentUser, token } = useContext(AuthContext);
    const API = apiURL();
    const [userId, setUserId] = useState("");
    const history = useHistory("");
    const [user, setUser] = useState([]);
    const [profilepicture, setProfilePicture] = useState("");
    // const [user, setUser] = useState([]);
    const [username, setUsername] = useState("")
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [biography, setBiography] = useState("");

    // contact
    const [showContact, setShowContact] = useState(false);
    const handleCloseContact = () => setShowContact(false);
    const handleShowContact = () => setShowContact(true);
    // about
    const [showAbout, setShowAbout] = useState(false);
    const handleCloseAbout = () => setShowAbout(false);
    const handleShowAbout = () => setShowAbout(true);
    // login
    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // signup
    const [showSignup, setShowSignup] = useState(false);
    const handleCloseSignup = () => setShowSignup(false);
    const handleShowSignup = () => setShowSignup(true);
    const [emailSignup, setEmailSignup] = useState("");
    const [passwordSignup, setPasswordSignup] = useState("");
    const userName = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const bio = useInput("");
    // uploading image
    const [file, setFile] = useState({preview: "", raw: ""});
    const [fileName, setFileName] = useState("");
    const [imageAsUrl, setImageAsUrl] = useState("");
    const [imageAsFile, setImageAsFile] = useState("");
    const [signupImage, setSignupImage] = useState("")
    // const age = useInput("");
    const [userSignup, setUserSignup] = useState([]);
    // toastify
    const underConstruction = () => toast("This part of the app is under construction. Coming soon :)");
    // navbar after login


    const handleImageAsFile = (e) => {
        const image = e.target.files[0];
        const types = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
        if (types.every((type) => image.type !== type)) {
          alert(`${image.type} is not a supported format`);
        } else {
          setImageAsFile((imageFile) => image);
        }
        if (e.target.files.length) {
            setFile({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
      };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
            history.push("/");
        } catch (err) {
            alert("Not able to logout. Please try again.", err); 
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

    const handleDemoLogin = async (e) => {
        e.preventDefault();
        try {
            // for deployed site ---> heytems01@gmail.com
            // for local site --> heytemi@gmail.com
            await login("heytemi@gmail.com", "test123");
            history.push("/user-feed")
        } catch (err) {
            alert("Not able to log in. Please try again.", err)
        }
    }


    const handleUploadProfilepic = () => {
        debugger
        return new Promise((resolve, reject) => {
            const uploadTask = storage.ref(`/profilePicture/${file.raw.name}`).put(file.raw);
            uploadTask.on(
                "state_changed",
                (snapShot) => {
                    console.log(snapShot);
                },
                (err) => {
                    console.log(err);
                    reject(err)
                },
                () => {
                        storage
                        .ref("profilePicture")
                        .child(file.raw.name)
                        .getDownloadURL()
                        .then((fireBaseUrl) => {
                            resolve(fireBaseUrl);
                        }) 
                        .catch((err)=> {
                            reject(err)
                        });
                }
            );
        })
    }

    const handleNewUser = async (e) => {
        debugger
        try {
            e.preventDefault();
            let fireBaseUrl = await handleUploadProfilepic(e);
            let res = await signUp(emailSignup, passwordSignup);
            let data = {
                "id": res.user.uid,
                "email": emailSignup,
                "username": userName.value,
                "first_name": firstName.value,
                "last_name": lastName.value,
                "bio": bio.value,
                "profilePic": fireBaseUrl
            };
            await axios.post(`${API}/api/users`, data);
            history.push("/user-feed");
        } catch (err) {
            console.log(err)
        }
    };

// multer
//     const handleNewUser = async (e) => {
//         debugger
//         try {
//             e.preventDefault();
//             const formData = new FormData();
//             formData.append("myImage", file.raw);
//             formData.append("file", file.preview);
//             formData.append("email", emailSignup);
//             formData.append("username", userName.value);
//             formData.append("first_name", firstName.value);
//             formData.append("last_name", lastName.value);
//             formData.append("bio", bio.value);
//             const config = {
//                 headers: {
//                     "content-type": "multipart/form-data", <----important for multer
//                 },
//             }
//             try {
//                 let res = await signUp(emailSignup, passwordSignup);
//                 formData.append("id", res.user.uid);
//             await axios.post(`${API}/api/users`, formData, config);
//             history.push("/user-feed");
//             } catch (err) {
//                 console.log(err)
//             }
//         } catch (err) {
//             console.log(err)
//         }
// };

    useEffect(() => {
        const fetchUser = async () => {
            try {
            let res = await axios({
                method: "get",
                url: `${API}/api/users/${currentUser.uid}`,
                headers: {
                    AuthToken: token,
                },
            });
            debugger
            setUserId(res.data.getUser.id);
            setUser(res.data.getUser);
            setUsername(res.data.getUser.username);
            setProfilePicture(res.data.getUser.profilepic);
            setFirstname(res.data.getUser.first_name);
            setLastname(res.data.getUser.last_name);
            setBiography(res.data.getUser.bio);
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
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">

                    {/* <a class="navbar-brand" href="#">Navbar</a> */}
                    {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button> */}

                        <NavLink className="pintrestLogoLetters" to={"/user-feed"}> L </NavLink>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>


                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav user2">

                                <li style={{marginLeft:"3rem", marginTop:"0.5rem"}} class="nav-item two">
                                    <NavLink className="user-nav-feed" to={"/user-feed"}>Home </NavLink>
                                </li>

                                <li style={{marginLeft:"1rem", marginTop:"0.5rem"}} class="nav-item">
                                    <button className="user-today" onClick={underConstruction}>Today</button>
                                    <ToastContainer
                                        position="top-center"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                        />
                                </li>
                                        
                                {/* <li class="nav-item">
                                    <NavLink class="nav-link" className="user-nav-today" to={"/today"}>Today</NavLink>
                                </li> */}

                                <SearchBar style={{marginRight:"3rem"}} className="user-nav-search"> </SearchBar>

                                {/* <form class="form-inline my-2 my-lg-0">
                                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form> */}


                                <li style={{marginRight:"2rem", marginLeft:"2rem", marginTop:"0.5rem"}} class="nav-item">
                                    {/* <NavLink class="nav-link messages" className="user-nav-message" to={"/messages"}> Messages </NavLink> */}
                                    <button className="user-nav-message" onClick={underConstruction}>M</button>
                                </li>

                                <li style={{marginRight:"2rem", marginLeft:"2rem"}} class="nav-item">
                                    <NavLink className="user-nav-image" to={"/user-profile/boards"}> <img className="user-nav-image-2" src={profilepicture}/> </NavLink> 
                                </li>


                                <div className="dropdown"> 
                                    <button className="user-nav-accounts" to={"/accounts"}>Accounts</button>
                                    
                                    <div className="account-dropdown-content">
                                        <label className="drop-labels">ACCOUNTS</label>
                                            <a href="#" class="disabled"> Add another account </a>
                                            <a href="#" class="disabled"> Add a free business account </a>
                                        <label className="drop-labels"> MORE OPTIONS</label>
                                   
                                            <NavLink to={"/settings"}> Settings </NavLink>
                                            <a href="#" class="disabled"> Tune your home feed </a>
                                            <a href="#" class="disabled"> Install the chrome app </a>
                                            <a href="#" class="disabled"> Get help </a>
                                            <a href="#" class="disabled"> See terms and privacy </a>
                                            <button className="logout-btn-style" onClick={handleLogout}>Logout</button>
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
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        
                        <NavLink /*class="navbar-brand"*/ className="pintrestLogoLettersNon" to={"/"}> LIFETREST </NavLink>
                        {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button> */}

                            <div className="non-user-floatRight" style={{justifyContent:"flex-end"}} class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="non-user-floatRight" class="navbar-nav">


                                    <li style={{marginLeft:"7px"}} class="nav-item">
                                        {/* <NavLink disabled class="nav-link publicNavLink" className="publicNavLink" to={"/about"}> About </NavLink> */}
                                        {/* <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> */}
                                        <button className="publicNavAbout" variant="primary" onClick={handleShowAbout}>
                                            About
                                        </button>
                                    </li>


                                    <li style={{marginLeft:"7px"}} className="nav-item">
                                        <button className="publicNavContact" onClick={handleShowContact}>
                                            Contact 
                                        </button>
                                    </li>

                                <li style={{marginLeft:"7px"}} class="nav-item"> 
                                    <button className="publicNavLogin" variant="primary" onClick={handleShowLogin}> Login </button>
                                </li>
      



        <li style={{marginLeft:"7px"}} class="nav-item">
            <button className="publicNavSignup" variant="primary" onClick={handleShowSignup}> Sign Up </button>
        </li> 
{/* <ul> */}

</ul>


    <div className="main-login">
        <Modal className="fullModal" show={showLogin} onHide={handleCloseLogin}>
      
            <Modal.Header closeButton>
            {/* <Modal.Title className="loginhello">Login</Modal.Title> */}
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

                            <Button style={{color:"#ffffff", backgroundColor:"brown", border:"none", height:"2rem"}} bsstyle="primary" onClick={handleDemoLogin}>
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
                <p className="otherExtraShit"> By continuing, you agree to Lifetrest's Terms of Service, Privacy Policy</p>
                <NavLink className="signup-from-login" exact to={"/"}> Not on Pintrest yet? Sign up </NavLink>
            </Modal.Footer>
        </Modal>
    </div>

    <div className="about-modal">
        <Modal className="fullAboutModal" show={showAbout} onHide={handleCloseAbout}>
            <Modal.Header closeButton>
                <Modal.Title className="modaltitle1">Why Clone Pinterest?</Modal.Title>
            </Modal.Header>

            <Modal.Body className="modalBody-about">
                <div className="aboutDiv">
                    <div className="sub-div">
                        <div className="rightDiv"> 
                            <p className="holaDiv"> Welcome to Lifetrest! </p>

                            <p className="about-me"> For my Comprehensive Technical Assessment through <a className="myPursuit" href="https://www.pursuit.org/fellowship"> PURSUIT</a>, 
                                I decided to clone Pinterest since it's an app that I frequently use. As a 
                                visitor, you can login with the demo account or you can create your own account via 
                                the signup modal. Once a part of Lifetrest, you're able to create boards and pins. 
                                In addition, you are able to delete a board which then deletes all pins in that particular board 
                                and from the app. You're able to view all your own pins as well as boards and just like Pinterest, 
                                you're able to view ALL pins that live in the Livetrest app via your feed. You can also utilize the 
                                SEARCH BAR to search for pins based on hashtags! 
                            </p>
                            
                            <p className="about-me"> <h3 style={{color:"brown"}}> What's Next? </h3> Bit by bit, I am increasing the functionality as well as testing 
                                my design and animation skills.
                            </p>

                            <p className="about-me"> <h3 style={{color:"brown"}}> Future Implementations </h3> I want users to be able to edit their profile information as well as 
                                being able to pin another user's pins to their own board. Full responsiveness as well! </p>

                            <p className="about-me"> <h4 style={{color:"brown"}}> Since December 2020 Re-Deployment </h4> December 21st, 2020: Users able to view other user's profiles via username [pins only]
                                </p>
                            <p className="about-me"> January 11th, 2021: All images are now uploaded using firebase storage [previously multer]
                                </p>
                            <p className="about-me"> January 11th, 2021: Search component now using htlm datalist tag in order to select options. Will create custom datalist tag for styling purposes
                                </p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>

        <div className="contact-modal">
            <Modal className="fullContactModal" show={showContact} onHide={handleCloseContact}>
                <Modal.Header closeButton>
                    <Modal.Title className="modaltitle1">Let's Chat</Modal.Title>
                </Modal.Header>

                <Modal.Body className="modalBody-about">
                    <div className="aboutDiv">
                        <div className="sub-div">
                            <div className="rightDiv"> 
                                <p className="my-name-is"> Hi, my name is Uduakabasi but you can also call me Darsu. It's a play on my middle and last name. I'm a fullstack web developer focusing on UX/UI and backend. I also dabble in photography.</p> 
                                <p> You can check out my <a className="myPortfolio" href="https://uduakabasi.netlify.app/"> portfolio </a> and you'd like, you can follow me on <a className="instagram" href="https://www.instagram.com/darsu.chats/">Instagram</a> or <a className="twitter" href="https://twitter.com/darsuCodes">Twitter</a>. If you want to check out what I've been up to in regards to coding... here's my <a className="github" href="https://github.com/darsuabasi">Github</a>. Happy pinning :)
                                </p> 
                                <img src={itsme} style={{width:"400px", height:"450px"}}/>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>

        <div className="main-signup-modal">
            <Modal className="fullModalSignup" show={showSignup} onHide={handleCloseSignup}>
                <Modal.Header closeButton>
                    {/* <Modal.Title className="loginhello">Welcome to Lifetrest!</Modal.Title> */}
                </Modal.Header>

                <Modal.Body className="modalBodySignup">

                    <div className="main-signup"> 
                    <h3 className="loginhello"> Welcome to Lifetrest! </h3>
                        <form className="signupForm" action="#" onSubmit={handleNewUser}> 
                            <div className="firstDiv"> 
                                <div className="signup-name">
                                    <label className="nameLabel"> First Name <input className="signup-input" {...firstName} placeholder="First Name"/> </label> 
                                    <label className="nameLabel"> Last Name <input className="signup-input" {...lastName} placeholder="Last Name"/> </label> 
                                </div>
                                <label style={{marginTop:"30px"}}> Enter a username <input className="signup-input username" style={{width:"30.5vw"}} {...userName} placeholder="Username"/> </label>
                            </div>

                            <div class="secondDiv-signup"> 
                                <div classNmae="suPhoto" style={{alignSelf:"center"}}>
                                    <img src="" alt="Image Preview" className="profile-pic-preview-signup" src={file.preview}/>           
                                </div>
                                <div className="suPhotoTitle"> 
                                    <label for="file-upload" class="custom-file-upload-signupPic" style={{textAlign:"center", marginBottom:"10%", fontVariant:"small-caps", fontWeight:"800", fontSize:"20px"}}>
                                        Click to Upload
                                    </label>
                                    <input id="file-upload" className="image-preview-view" type="file" name="myImage" accept="image/png/jpeg" onChange={handleImageAsFile} placeholder="Your photo"/>
                                </div>
                                <label class="label"> Enter your email <input placeholder="Email" 
                                    text="email"
                                    value={emailSignup}
                                    onChange={(e) => setEmailSignup(e.currentTarget.value)}
                                    className="signup-input"
                                    />
                                    </label> 

                                <label class="label"> Enter a password <input placeholder="Password" 
                                    text="password"
                                    value={passwordSignup}
                                    onChange={(e) => setPasswordSignup(e.currentTarget.value)}
                                    autoComplete="on"
                                    type="password"
                                    className="signup-input"
                                    /> 
                                    </label>
                                <label> Tell us a little bit about yourself <textarea rows="4" cols="50" className="signup-input" {...bio} placeholder="Bio bc who ru?"/> </label>
                            </div>

                            <div className="thirdDiv"> 
                                {/* <div className="signup-button">
                                    <button className="comeSignup" type="submit"> Sign up </button>
                                </div> */}
                                <div className="btn-div-signup">
                                    <button className="signup-page-button1" type="submit"> Sign up </button>
                                    <div class="sunTwo"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <p className="otherExtraShit"> By continuing, you agree to Lifetrest's Terms of Service, Privacy Policy</p>
                    {/* <NavLink className="login-from-signup" exact to={"/login"}> Already a member? Log in </NavLink> */}

                </Modal.Footer>
            </Modal>
        </div>
    </div>

                    </nav>

                </div>
            )
        }
    }

    return (
        <div className="navbarUno"> 
                {displayNavForUser()}
        </div>
    )
}

export default Navbar
