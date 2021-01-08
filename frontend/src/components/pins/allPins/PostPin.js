import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import '../../../css/PostPin.css';
// import Likes from '../Likes';


const PostPinModal = ({ imageurl, userName, profilepic, creator_id, pinContent, pinId }) => {
  const history = useHistory();
  const userNameRedirect = (userName) => history.push(`/users/${userName}/pins`);
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal)
  }

  const handleStyleProfile = {
    height: "100px",
    width: "100px"
  };

  return (
    <div className="mainDivModal "> 
        <div title ={pinId} className={`mainDivModalBackground showModal-${modal}`}>    
          <div className="innerModal">
              <div className="pinImage">
                <img className="styleImage modal-content" alt="Pin img" src={imageurl} />
              </div>
              <div className="pinContent">
                <div>
                  <button className="closeButton card-img-top" onClick={() => toggleModal()}> X </button>
                </div>

                <div className="profile-pic-div">
                  <img onClick={() => userNameRedirect(userName)} className="styleProfilePicOverlay-two" alt="User's profile picture" src={profilepic} style={handleStyleProfile} />
                </div>

                <h3 onClick={() => userNameRedirect(userName)} className="styleusername">{userName}</h3>

                <div className="contentDiv-userFeed">
                  <h3 className="styleContent">Content <p className="pinContent-fr">{pinContent}</p> </h3>
                </div>
              </div>
          </div>
        
        </div>
      <div className="overflow">
        <img className="exitButton card-img-top" alt="Pin img" onClick={() => toggleModal()} src={imageurl} />
      </div>
      
    </div>
  );
};

export default PostPinModal;
