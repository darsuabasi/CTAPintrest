import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PostPinModal from '../allPins/PostPin';
import '../../../css/PinList.css'

import { apiURL } from '../../../util/apiURL';
import { AuthContext } from '../../../providers/AuthProvider';


const UsersPinDisplay = () => {
    const API = apiURL(); 
    const [pins, setPins] = useState([]);
    const { currentUser, token } = useContext(AuthContext);


    useEffect(() => {
        const fetchPinsByUserId = async () => {
            try {
                let res = await axios({
                    method: "get",
                    url: `${API}/api/users/${currentUser.uid}/pins`,
                    headers: {
                        AuthToken: token,
                    }
                })
                setPins(res.data.payload)
                console.log(res.data)
            } catch(err) {
                setPins([])
                console.log(err.message);
                }
            };
            fetchPinsByUserId();
    }, [])

    const displayPin = pins.map(pin => {
        return ( <PostPinModal key={pin.id} pinId={pin.id} userName={pin.usernmae} imageurl={pin.imageurl} pinContent={pin.note} /> )
    })

   return (
       <div className="pinCard">
            {displayPin}
       </div>
   )

}

export default UsersPinDisplay;

