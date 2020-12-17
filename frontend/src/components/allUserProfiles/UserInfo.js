import React from 'react';

const UserInfo = ({id, username, first_name, last_name, bio, created_at, profilePic, email}) => {

    return (
        <div title={id}>
            <img alt="" src={profilePic} />
            <h1> Name: {first_name} {last_name}</h1>
            <h1> @{username}</h1>
            <h1> Member Since:  {created_at} </h1>
            <h1> Bio: {bio} </h1>
        </div>
    )
}

export default UserInfo;
