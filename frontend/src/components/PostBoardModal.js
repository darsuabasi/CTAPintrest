import React from "react";
// import Likes from '../Likes';

import '../css/PostBoard.css'
import { apiURL } from '../util/apiURL';

const PostBoardModal = ({ board_name, imageurl, creator_id, board_description, boardId }) => {

  const API = apiURL(); 

 


  return (
    <div className="mainDivModal card text-center shadow"> 
      <div title ={boardId} className="mainDivModalBackground showModal">
        {/* <div className="innerModal">
          <div className="boardImage">
          </div>
          <div className="boardContent">

            <h1> hello world</h1>
          </div>
        </div> */}
        
      </div>
      <div className="overflow">
        {/* <img className="styleImage modal-content" alt="" src={imageurl} /> */}
        <p className="style-board-name"> {board_name} </p>
        {/* <button> Delete Board </button> */}
        <img className="exitButton card-img-top" src={imageurl} />
        {/* <h4 className="styleusername">{creator_id}</h4> */}
        <p className="styleContent">{board_description}</p>
      </div>
      
    </div>
  );
};

export default PostBoardModal;
