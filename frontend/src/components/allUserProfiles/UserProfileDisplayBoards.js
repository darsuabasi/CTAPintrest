import React, {useState, useEffect, useContext} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import './css/userprofiledisplay.css';
import { AuthContext } from "../../providers/AuthProvider";
import { apiURL } from "../../util/apiURL";
import UserInfo from './UserInfo';
import UserBoards from "./UserBoards"

const UserProfileDisplayBoards = () => {
    const API = apiURL();
    const { username } = useParams();
    const [users, setUsers] = useState([]);
    const { loading } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let res = await axios({
                    method: "get",
                    url: `${API}/api/users`
                })
                setUsers(res.data.payload)
            } catch(err) {
                console.log(err.message);
                }
            };
            fetchUser()
    }, [])

    const selectedUser = users.map((user, i) => {
        if (username === user.username) 
        return (
            <div className="userProfile-main-container">
                <div className="userProfile-top-div" title={i}>
                    <UserInfo key={i} id={user.id} username={user.username} first_name={user.first_name} last_name={user.last_name} bio={user.bio} created_at={user.created_at} profilePic={API+user.profilepic} email={user.email}/>
                </div>

            </div>
        )
    });
    console.log(selectedUser);

    if (loading) return <div>Loading...</div>;


    return (
        <div className="userProfile-main-container">
            {/* <div className="userProfile-top-div"> */}
                {selectedUser}    
            {/* </div> */}


            <div className="userProfile-bottom-div">
                <UserBoards username={username}/>
            </div>
        </div>
    );
}


export default UserProfileDisplayBoards;