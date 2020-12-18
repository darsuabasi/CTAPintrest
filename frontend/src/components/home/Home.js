import React from 'react';
import SingleHomePin from './SingleHomePin'
import { Link } from 'react-router-dom';
import AllPinsDisplay from '../pins/allPins/AllPinsDisplay';
import '../../css/Home.css'

const Home = () => {

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