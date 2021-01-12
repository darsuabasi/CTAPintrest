import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PostPinModal from './PostPin';
import '../../../css/PinList.css'
import { apiURL } from '../../../util/apiURL';
import { AuthContext } from '../../../providers/AuthProvider';


const AllPinsDisplay = () => {
    const API = apiURL(); 
    const [pins, setPins] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchAllPins = async () => {
            try {
                let res = await axios({
                    method: "get",
                    url: `${API}/api/pins`,
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
            fetchAllPins();
    }, [])

    const displayPins = pins.map((pin, i) => {
        return ( 
            <div key={i}>
                <PostPinModal key={pin.id} pinId={pin.id} userName={pin.username} imageurl={pin.imageurl} profilepic={pin.profilepic} pinContent={pin.note} />
            </div> 
        )
    });

   return (
       <div className="pinCard">
            {displayPins}
       </div>
   )
}

export default AllPinsDisplay;