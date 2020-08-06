import React, { useState } from "react";
import '../../../css/PostPin.css';
// import Likes from '../Likes';


const PostPinModal = ({ imageurl, userName, creator_id, pinContent, pinId }) => {

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal)
  }

  
  return (
    <div className="mainDivModal "> 
        <div title ={pinId} className={`mainDivModalBackground showModal-${modal}`}>    
          <div className="innerModal">
              <div className="pinImage">
                <img className="styleImage modal-content" alt="Board img" src={imageurl} />
              </div>
              <div className="pinContent">
                <button className="closeButton card-img-top" onClick={() => toggleModal()}> X </button>
                <h3 className="styleusername">{userName}</h3>
                <p className="styleContent">{pinContent}</p>
              </div>
          </div>
        
        </div>
      <div className="overflow">
        <img className="exitButton card-img-top" alt="Board img" onClick={() => toggleModal()} src={imageurl} />
      </div>
      
    </div>
  );
};

export default PostPinModal;
