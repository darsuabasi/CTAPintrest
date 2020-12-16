import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import { AuthContext } from '../../providers/AuthProvider'
import SingleHomePin from './SingleHomePin'
import Tags from '../Tags'
import { Link } from 'react-router-dom';
import AllPinsDisplay from '../pins/allPins/AllPinsDisplay';
import Pin from '../pins/allPins/Pin';
import DisplayPins from '../DisplayPins';
import '../../css/Home.css'

const Home = () => {
        const [pins, setPins] = useState([]);
        const API = apiURL();
        const { token } = useContext(AuthContext);

        // useEffect(() => {
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

   return(
        <div className="homeDiv">
            <div className='homeDiv-sub'>
                <div className="dropdown two">
                    <button class="circular ui icon button" className="create-btn"> D </button>
                        <div className="add-dropdown-content">
                            <Link className="style-create-board-dropdown" to={"/create-board"} > Create Board </Link>
                            <Link className="style-create-pin-dropdown" to={"/create-pin"} > Create Pin </Link>
                        </div>
                </div>
            </div>

            <div className="main4Pins">
                <AllPinsDisplay/>
            </div>

             <div className="container-fluid d-flex justify-content center"> 
                
            </div>   
        </div>
    )
}

export default Home;