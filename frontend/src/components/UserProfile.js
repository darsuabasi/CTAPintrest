import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../providers/AuthContext';
import axios from 'axios';
import { apiURL } from '../util/apiURL';
import Modal from '../components/modal/Modal'
import '../css/UserProfile.css'

const UserProfile = () => {
    const API = apiURL();
    const [user, setUser] = useState([]);
    const { token, currentUser } = useContext(AuthContext);

    useEffect(() => {


        const fetchUserById = async () => {
            let res = await axios({
                method: "get",
                // url: `${API}/api/users/${currentUser.uid}`,
                url: `${API}/api/users`,
                headers: {
                    AuthToken: token,
                },
            });
            setUser(res)
        };
        fetchUserById();
    }, [])
    return(
        <div className="main-style-user"> 
            <div className="user-info-display">
                <div className="style-profile-pic"> 
                    {/* user.imageUrl */}
                    <h1> Picture </h1>
                </div>

                <div className="style-user-name">
                    {/* user.firstname user.lastname */}
                    <h2>Darsu Abasiurua</h2>
                </div>

                <div className="style-user-bio">
                    {/* user.bio*/}
                    <h5> It's me, your fave city gyal </h5>
                </div>

                <div className="style-followers-display">
                    {/* show # of followers & # of following [you can use a counter whoop whoop*/}
                    <h7> 2123839 Followes - 21 Following</h7>

                </div>
                
            </div> 

            <div className="style-all-user-btns">
                <div className="edit-and-share-buttons">
                    <button class="circular ui icon button" className="style-edit-btn"> </button>
                    {/* pen icon that links to edit profile */}
                    <button class="circular ui icon button" className="style-share-btn">  </button>
                    {/* modal that allows you to send profile via whatsapp, fb, twitter, email + copy link button, input field for name or email  */}
                </div>

                <div class="ui large buttons" className="board-and-pin-div--toggle">
                    <button class="ui button" className="style-board-btn"> Boards </button>
                    <button class="ui button" className="style-pin-btn"> Pins </button> 
                </div>

                <div className="sort-and-create">
                    <button class="circular ui icon button" className="sort-btn">  </button>
                    {/* sort icon that triggers a drop down */}
                    <button class="circular ui icon button" className="create-btn"> </button>
                    {/* [+ modal] [Create Pin] [Add to board] */}
                </div>
            </div>

            <div className="idk-style-div"> 
                <div className="get-pintrest-and-create-pin">
                    <button className="create-btn-again"> + </button>
                    {/* + button that triggers modal for [get browser button] & [create a pin]  */}
                    <button className="help-button"> ? </button>
                    {/* ? button that triggers modal for [visit help center] [see order history] [create widget] */}
                </div>
            </div>

                

                <div className="board-and-pin-mainCard"> 
                    <div className="board-card">
                        {/* displayBoards */}
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