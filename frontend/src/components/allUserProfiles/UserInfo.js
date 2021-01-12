import React from 'react';
import { useHistory } from "react-router-dom";
import './css/userinfo.css';


const UserInfo = ({id, username, first_name, last_name, bio, created_at, profilePic, email}) => {
    const history = useHistory();
    const userNameRedirect = (username) => history.push(`/users/${username}/pins`);
    const userPinsRedirect = (username) => history.push(`/users/${username}/pins`);
    const userBoardsRedirect = (username) => history.push(`/users/${username}/boards`);
    

    const displayDate = (e) => {
        const stringDate = e.toString();
        let displayDate = new Date(stringDate);
        return displayDate.toLocaleDateString();
      };

    return (
        <div title={id} className="user-info-full-div">
            <img className="all-users-profile-picture" alt="" src={profilePic} />
            <p className="all-users-username" onClick={() => userNameRedirect(username)}>  @{username}</p>

            <div className="flex-full-name-div">
                <label className="flex-full-name-label"> Name: </label>
                <p className="flex-full-name-ptag"> {first_name} {last_name}</p>
            </div>

            <div className="flex-member-since-div">
                <label className="flex-member-since-label"> Memeber: </label>
                <p className="flex-member-since-ptag"> {displayDate(created_at)}</p>
            </div>

            <div className="flex-bio-div">
                
                <p className="flex-bio-ptag"> <label className="flex-bio-label"> Bio: </label> {bio}</p>
            </div>

            <div className="user-profile-btn-div">
                <button className="user-profile-pins-btn" onClick={() => userPinsRedirect(username)}> Pins </button>
                <button className="user-profile-boards-btn" onClick={() => userBoardsRedirect(username)}> Boards </button>
            </div>
        </div>
    )
}

export default UserInfo;
