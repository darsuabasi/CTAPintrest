import React, { useState } from "react";
// import Likes from '../Likes';

import '../css/PostBoard.css'
import { apiURL } from '../util/apiURL';

const PostBoardModal = ({ board_name, imageurl, creator_id, board_description, boardId }) => {

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
    <div className="mainDivModal card text-center shadow"> 
      <div title ={boardId} className={`mainDivModalBackground showModal-${modal}`}>
        <div className="innerModal">
          <div className="boardImage">
            <img className="styleImage modal-content" alt="" src={imageurl} />
          </div>
          <div className="boardContent">
            <h4 className="styleusername">{creator_id}</h4>
            <p className="style-board-name"> {board_name} </p>
            <p className="styleContent">{board_description}</p>

            <button className="closeButton card-img-top" onClick={() => toggleModal()}> X </button>
            {/* <h1> hello world</h1> */}
          </div>
        </div>
        
      </div>
      <div className="overflow">
        <img className="exitButton card-img-top" onClick={() => toggleModal()} src={imageurl} />
      </div>
      
    </div>
  );
};

export default PostBoardModal;
