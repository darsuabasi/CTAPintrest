import React from 'react'
// import image1 from '../../assets/gucciDenim.jpeg'
// import ImageUpl
import '../../../css/pin-style.css';

const Pin = (props) => {
    return(
        <div className="card text-center shadow">
            <div className="overflow2">
                <img src={props.imgsrc} alt="yupImg" className="card-img-top"/> 
            </div>
            {/* <div className="card-body text-dark">
                <h4 className="card-title"> {props.title} </h4> 
                <p className="card-text text-secondary"> {props.username} </p>
                <a href="#" className="btn btn-outline-success"> {props.link} </a>
            </div> */}

        </div>
    );
}

export default Pin; 