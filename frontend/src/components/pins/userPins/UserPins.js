import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../providers/AuthProvider';
import axios from 'axios';
import { apiURL } from '../../../util/apiURL';
import '../../../css/UserPinProfile.css';
import { Link, useHistory } from 'react-router-dom';
import { useInput } from '../../../util/useInput';
import CurrentUserPinDisplay from './CurrentUserPinDisplay';
import UsersPinDisplay from './UsersPinDisplay'

const UserPins = () => {
    const { currentUser, token } = useContext(AuthContext);
    const API = apiURL();
    const body = useInput("");
    const [userId, setUserId] = useState("");
    const [pins, setPins] = useState("");
    const history = useHistory("");
    const [user, setUser] = useState([]);
    const [username, setUsername] = useState("")
    const [profilepicture, setProfilePicture] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");

    
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
            debugger
            setUserId(res.data.getUser.id);
            setUser(res.data.getUser);
            setUsername(res.data.getUser.username);
            setProfilePicture(res.data.getUser.profilepic);
            setFirstName(res.data.getUser.first_name);
            setLastName(res.data.getUser.last_name);
            setBio(res.data.getUser.bio); 
            } catch (err) {
                console.log(err.message)
            }
        };
        fetchUser();
    }, []);

    
    // useEffect(() => {
   
        
        // const fetchPins = async () => {
        //     try {
        //         debugger
        //         let res = await axios({
        //             method: "get",
        //             url: `${API}/api/pins`,
        //             headers: {
        //                 AuthToken: token,
        //             }
        //         })
        //         // debugger
        //         setPins(res.data.payload)
        //     } catch(err) {
        //         setPins([])
        //         console.log(err.message);
        //         }
        //     };
        //     fetchPins();


    // const handleSubmit = async (e) => {
    //     try {
    //         e.preventDefault();
    //         const formData = new FormData();
    //         // formData.append("creator_id", userId);
    //         formData.append("body", body.value);
    //         formData.append("created_at", new Date().toString());

    //         const config = {
    //             headers: {
    //                 "content-type": "multipart/form-data",
    //             },
    //         };

    //         console.log(formData, "formd");
    //         console.log(config, "conf");
    //         let res = await axios.get(`${API}/api/pins`, formData, config);
    //         setPins(res);
    //         history.push("/user-feed");
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }


    return(
        <div className="main-style-user"> 
            <div className="user-info-display-card">
                {/* <h3 className="users-id"> User ID: {currentUser.uid} </h3> */}
                <div className="style-user-minicard">
                    <h3 className="styling-the-labels">Username </h3>
                    <h4 className="styling-the-variables"> : {username} </h4>
                </div>


                <div className="style-profile-pic"> 
                    <img className="profile-pic-preview" src={API+profilepicture} />
                </div>


                <div className="style-user-minicard">
                    <h3 className="styling-the-labels"> Name </h3>
                    <h4 className="styling-the-variables"> : {firstName}  {lastName} </h4>
                </div>


                <div className="style-user-minicard">
                    <h3 className="styling-the-labels"> Email </h3>
                    <h4 className="styling-the-variables"> : {currentUser.email} </h4>
                </div>



                <div className="style-user-minicard"> 
                    <h3 className="styling-the-labels"> Biography </h3>
                    <h4 className="styling-the-variables"> : {bio} </h4>
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
                    <div className="dropdown" style={{zIndex:"0"}}>
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

                    <div className="pin-card-two">
                        <CurrentUserPinDisplay/>
                    </div>
                    {/* <Boards/> if setBoards then display boards but if setPins, display Pins<Pins/> */}
                </div>
        </div>
    )
}

export default UserPins;