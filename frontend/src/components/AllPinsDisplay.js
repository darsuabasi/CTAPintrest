import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PostPinModal from '../components/pins/allPins/PostPin';
import '../css/PinList.css'

import { apiURL } from '../util/apiURL';
import { AuthContext } from '../providers/AuthProvider';
// import Tags from './Tags';


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

    const displayPin = pins.map(pin => {
        return ( 
        <>
        <PostPinModal key={pin.id} pinId={pin.id} userName={pin.usernmae} imageurl={API+pin.imageurl} pinContent={pin.note} />
        {/* <Tags pinId={pin.id} userName={pin.username} /> */}
        </> )
    })

   return (
       <div className="pinCard">
            {displayPin}
       </div>
   )

}

export default AllPinsDisplay;