import React from 'react';
import LandingPagePins from './LandingPagePins'
import '../../css/Landing.css'


const Landing = () => { 
    return(
        <div> 
            <div className="create-login-modal">           

            </div>
            <div className="all-pins-div">
                <LandingPagePins/>
            </div>
        </div>
    )
}

export default Landing; 