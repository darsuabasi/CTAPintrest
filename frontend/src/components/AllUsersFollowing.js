import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiURL } from '../util/apiURL';
// import { AuthContext } from '../providers/AuthProvider';


export default function AllUsersFollowing() {
    const [users, setUsers] = useState([]);
    const API = apiURL();
    // const [pins, setPins] = useState([]);
    // const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchAllUsers = async () => {
            let res = await axios({
                    method: "get", 
                    url: `${API}/api/users`,
                })
            setUsers(res.data.users);
        }
        fetchAllUsers();
    }, [])

    return(
        <div> 
            <h1>You must be logged in to view</h1>
            <h2>Welcome to your new following tab!</h2>
            <h2> Discover ideas from people you follow...</h2>

            <div> 
                <ul>
                {/* show a horizontal view of just the user images */}
                    {users.map(user => {
                        return <li key={user.id}>{user.email}</li>
                    })}
                </ul>

                {/* edit users button + glow and hover circle effect */}
            </div>

            <div>
                {/* <button> Find people to follow</button> */}
                {/* button will trigger modal that displays different accounts with follow buttons */}
                {/* --LAYOUT OF MODAL --

                back(button) --- Build your following feed(h1) -- done(button)
                horizontal navBar with different options 
                NAVBAR ---
                All, Trending, Women's Style, Home, Beauty, Food, More(dropdown) 
                --List accounts 2 in a row on modal display
                
                 */}
            </div>
        
        
        </div>
    )
}

