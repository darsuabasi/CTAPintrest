import React from 'react'
import '../../css/pin-style.css';

const SingleHomePin = (props) => {
    return(
        <div className="card text-center shadow">
            <div className="overflow">
                <img src={props.imgsrc} alt="ello1" className="card-img-top"/> 
            </div>
            <div className="card-body text-dark">
                <h4 className="card-title"> {props.title} </h4> 
                <p className="card-text text-secondary"> {props.username} </p>
            </div>
        </div>
    );
}

export default SingleHomePin; 