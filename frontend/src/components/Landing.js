import React from 'react';
import AllPins from './pins/AllPins';
import '../css/Landing.css'


const Landing = () => { 
    return(
        <div> 
            <div className="create-login-modal">           

            </div>
            <div className="all-pins-div">
                <AllPins/>
            </div>
        </div>
    )
}

export default Landing; 