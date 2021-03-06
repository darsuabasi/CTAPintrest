import React, { useEffect, useState, useContext } from 'react';
import PostPinModal from '../pins/allPins/PostPin';
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { apiURL } from "../../util/apiURL";
import './css/userpins.css';


const UserPins = ({username}) => {
    const API = apiURL();
    const { token, loading } = useContext(AuthContext);
    const [userPins, setUserPins] = useState([]);
  

    useEffect(() => {
        const fetchPinsByUsername = async () => {
            try {
                let res = await axios({
                    method: "get",
                    url: `${API}/api/pins`,
                    // headers: {
                    //     AuthToken: token,
                    // }
                })
                setUserPins(res.data.payload)
                console.log(res.data)
            } catch(err) {
                setUserPins([])
                console.log(err.message);
                }
            };
            fetchPinsByUsername();
    }, [username]);

      const userPinList = userPins.map((pin, i) => {
        if (username === pin.username)
          return (
            <div key={i}>
                <PostPinModal key={pin.id} pinId={pin.id} userName={pin.username} imageurl={pin.imageurl} profilepic={pin.profilepic} pinContent={pin.note} />
            </div> 
          );
      });
    
      if (loading) return <div class="lds-hourglass"></div>;
    
      return (
        <>
          <div className="user-pin-list-div">
            <div className="user-pin-div-setup"> 
              <h1 className="user-pins-now-viewing">Viewing {username}'s Pins</h1>
            </div>

            <div className="user-pins-now-displaying-layout">
              {userPinList}
            </div>
          </div>
        </>
      );
    };

export default UserPins;