import React from 'react'
// import image1 from '../../assets/gucciDenim.jpeg'
// import ImageUpl
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
                {/* <a href="#" className="btn btn-outline-success"> {props.link} </a> */}
            </div>

        </div>
    );
}

export default SingleHomePin; 