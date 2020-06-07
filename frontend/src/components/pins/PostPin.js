import React, { useState } from "react";
// import Likes from '../Likes';
import '../../css/PostPin.css';
import { apiURL } from '../../util/apiURL';

const PostPinModal = ({ imageurl, userName, pinContent, postId }) => {

  const [modal, setModal] = useState(false);
  const API = apiURL(); 

  const toggleModal = () => {
    setModal(!modal)
  }

  const handleStylePin = {
    height: "200px",
    // width: "500px",
    border: "2px solid #000000"
  };

  

  return (
    <div className="mainDivModal card text-center shadow"> 
      <div title ={postId} className={`mainDivModalBackground showModal-${modal}`}>
        <div className="innerModal">
          <div className="pinImage">
            <img className="styleImage modal-content" alt="" src={imageurl} style={handleStylePin}/>
          </div>
          <div className="pinContent">
            <p className="styleContent">{pinContent}</p>
            <h4 className="styleusername">{userName}</h4>
            <h1> hello world</h1>

            <button className="closeButton card-img-top" onClick={() => toggleModal()}> X </button>

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
