import React from "react";
import axios from 'axios'
// import Likes from '../Likes';
import '../../css/PostBoard.css'
import { apiURL } from '../../util/apiURL';

const PostBoardModal = ({ board_name, imageurl, creator_id, board_description, boardId, username}) => {

  const handleStylePost = {
    height: "400px",
    width: "320px"
  };

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
    // <div className="mainDivModal card text-center shadow"> 
    //   <div title ={boardId} className="mainDivModalBackground showModal"> 
    //     </div>
    //       <div className="overflow">
    //         <button className="delete-board-btn" onClick={deleteBoard}> Delete </button>
    //         <h3 className="style-board-name-header">Board: <p className="style-board-name">{board_name}</p> </h3>
    //         <h3 className="style-board-description-header">Description: <p className="style-board-description"> {board_description}</p></h3>
    //         <img className="exitButton card-img-top" style={{transform:"none"}} alt="imgurl" src={imageurl} />
    //       </div>
    // </div>
    <div class="imageCard-boards" title ={boardId}>
      <h3 className="style-board-name-header">Board:  <p className="style-board-name"> {board_name}</p> </h3>
      <img className="styleImgForPin-boards" src={imageurl} alt="" style={handleStylePost}/>
      <div class="image__overlay image__overlay--primary">
        {/* <img onClick={() => userNameRedirect(userName)}  className="styleProfilePicOverlay" alt="" src={profilepic} style={handleStyleProfile} /> */}
          {/* <div onClick={() => userNameRedirect(userName)} class="image__title">{userName}</div> */}
          <button className="delete-board-btn" onClick={deleteBoard}> Delete </button>
          <p className="style-label-for-board-descrip" class="image__description-boards"> About <p>{board_description}</p></p>
          {/* <p> {tag_name} </p> */}
      </div>
    </div>
  );
};

export default PostBoardModal;
