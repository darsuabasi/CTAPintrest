import React, { useState } from "react";
// import Likes from '../Likes';
import '../../css/PostPin.css';
import { apiURL } from '../../util/apiURL';

const PostPinModal = ({ imageurl, userName, pinContent, pinId }) => {

  const [modal, setModal] = useState(false);
  const API = apiURL(); 

  const toggleModal = () => {
    setModal(!modal)
  }

  const handleStylePin = {
    height: "500px",
    width: "600px",
    border: "6px solid #E60023",
  };

  

  return (
    <div className="mainDivModal "> 
        <div title ={pinId} className={`mainDivModalBackground showModal-${modal}`}>    
          <div className="innerModal">
              <div className="pinImage">
                <img className="styleImage modal-content" alt="" src={imageurl} />
              </div>
              <div className="pinContent">
                <button className="closeButton card-img-top" onClick={() => toggleModal()}> X </button>
                <p className="styleContent">{pinContent}</p>
                <h4 className="styleusername">{userName}</h4>
              </div>
          </div>
        
        </div>
      <div className="overflow">
        <img className="exitButton card-img-top" onClick={() => toggleModal()} src={imageurl} />
      </div>
      
    </div>
  );
};

export default PostPinModal;
