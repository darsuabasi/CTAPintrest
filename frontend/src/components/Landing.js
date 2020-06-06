import React from 'react';
import AllPins from './pins/AllPins';
import '../css/Landing.css'


const Landing = () => { 


    // const onRedirectSignup = (e) => {
    //     e.preventDefault();
    //     window.open("https://www.google.com");


    // }

    // const onRedirectLogin = (e) => {
    //     e.preventDefault();
    //     window.open("https://www.google.com");

    // }


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