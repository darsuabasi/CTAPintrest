import React from "react";
import axios from 'axios'
// import Likes from '../Likes';
import '../../css/PostBoard.css'
import { apiURL } from '../../util/apiURL';

const PostBoardModal = ({ board_name, imageurl, creator_id, board_description, boardId }) => {

  const API = apiURL(); 

  const deleteBoard = async (e) => {
    try {
      e.preventDefault();
      await axios.delete(`${API}/api/boards/${boardId}`);
      window.location.reload();

    } catch (err) {

    }

  }

  return (
    <div className="mainDivModal card text-center shadow"> 
      <div title ={boardId} className="mainDivModalBackground showModal"> 
        </div>
          <div className="overflow">
            <button className="delete-board-btn" onClick={deleteBoard}> Delete </button>
            <h3 className="style-board-name-header">Board: <p className="style-board-name">{board_name}</p> </h3>
            <h3 className="style-board-description-header">Description: <p className="style-board-description"> {board_description}</p></h3>
            <img className="exitButton card-img-top" style={{transform:"none"}} alt="imgurl" src={imageurl} />
          {/* <h4 className="styleusername">{creator_id}</h4> */}
          </div>
      
    </div>
  );
};

export default PostBoardModal;
