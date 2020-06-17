import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { apiURL } from '../util/apiURL';
// import Modal from '../components/modal/Modal'
import '../css/UserProfile.css'
import { Link, useHistory } from 'react-router-dom';
import { useInput } from '../util/useInput';
import BoardDisplay from './BoardDisplay'

const UserProfile = () => {
    const { currentUser, token } = useContext(AuthContext);
    const API = apiURL();
    const body = useInput("");
    const [userId, setUserId] = useState("");
    const [boards, setBoards] = useState("");
    const history = useHistory("");
    const [user, setUser] = useState([]);
    const [username, setUsername] = useState("")
    const [profilepicture, setProfilePicture] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");

    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                debugger
            let res = await axios({
                method: "get",
                url: `${API}/api/users/${currentUser.uid}`,
                headers: {
                    AuthToken: token,
                },
            });
            setUserId(res.data.getUser.id);
            setUser(res.data.getUser);
            setUsername(res.data.getUser.username);
            setProfilePicture(res.data.getUser.profilePic);
            setFirstName(res.data.getUser.first_name);
            setLastName(res.data.getUser.last_name);
            setBio(res.data.getUser.bio); 
            } catch (err) {
                console.log(err.message)
            }
        };
        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            // formData.append("creator_id", userId);
            formData.append("body", body.value);
            formData.append("created_at", new Date().toString());

            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
            };

            console.log(formData, "formd");
            console.log(config, "conf");
            let res = await axios.get(`${API}/api/boards`, formData, config);
            setBoards(res);
            history.push("/user-feed");
        } catch (err) {
            console.log(err);
        }
    }

// displaying all the boards function






    return(
        <div className="main-style-user"> 
            <div className="user-info-display">
                {/* <h3 className="users-id"> {currentUser.uid} </h3> */}
                {/* <div className="style-profile-pic">  */}
                <div className="style-user-name">
                    <h4 className="users-username">{username}</h4>
                </div>
                {/* <br/> */}
                <div className="style-profile-pic"> 
                    {profilepicture}
                    <p> profile picture here</p>
                </div>
                {/* <br/> */}
                <div className="style-user-name">
                    <h2 className="user-name"> {firstName}  {lastName} </h2>
                </div>
                {/* <br/> */}
                <div className="style-user-email">
                    <h3 className="user-email"> {currentUser.email}</h3>
                </div>
                {/* <br/> */}
                <div className="style-user-bio"> 
                    <h5 className="user-bio"> {bio} </h5>
                </div>




                {/* <div className="style-followers-display">
                    show # of followers & # of following [you can use a counter whoop whoop
                    <h7> 2123839 Followes - 21 Following</h7>

                </div> */}
                
            </div> 

            <div className="style-all-user-btns">
                <div className="edit-and-share-buttons">
                    <Link className="style-edit-btn" to={"/settings/edit-profile"} > E </Link>
                    {/* pen icon that links to edit profile */}
                    <button class="circular ui icon button" className="style-share-btn">  S </button>
                    {/* modal that allows you to send profile via whatsapp, fb, twitter, email + copy link button, input field for name or email  */}
                </div>

                <div className="board-and-pin-div--toggle">
                    <Link className="style-board-btn" to={"/user-profile/boards"} > Boards </Link>
                    <Link className="style-pin-btn" to={"/user-profile/pins"}> Pins</Link>
                </div>

                <div className="sort-and-create">
                    <button className="sort-btn"> S </button>
                    {/* sort icon that triggers a drop down */}
                    <div className="dropdown">
                        <button class="circular ui icon button" className="create-btn"> D </button>
                            <div className="add-dropdown-content">
                                <Link className="style-create-board-dropdown" to={"/create-board"} > Create Board </Link>
                                <Link className="style-create-pin-dropdown" to={"/create-pin"} > Create Pin </Link>
                            </div>
                    </div>
                </div>
            </div>




            {/* <div className="idk-style-div"> 
                <div className="get-pintrest-and-create-pin">
                    <button className="create-btn-again"> + </button>
                    + button that triggers modal for [get browser button] & [create a pin] 
                    <button className="help-button"> ? </button>
                    ? button that triggers modal for [visit help center] [see order history] [create widget]
                </div>
            </div> */}

                

                <div className="board-and-pin-mainCard"> 
                    <div className="board-card">
                    <BoardDisplay/>
                    </div>

                    <div className="pin-card">
                        {/* displayPins */}
                    </div>

                    {/* <Boards/> if setBoards then display boards but if setPins, display Pins<Pins/> */}
                </div>
        </div>
    )
}

export default UserProfile;