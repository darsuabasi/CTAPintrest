import React from "react";
import './images.css'

const PostImage = ({ imageurl, userName, profilepic, pinContent, pinId }) => {
  const handleStyleProfile = {
    height: "80px",
    width: "80px"
  };
  const handleStylePost = {
    height: "auto",
    width: "420px"
  };

  return (
    <div class="imageCard" title ={pinId}>
      <img className="styleImgForPin" class="image__img" src={imageurl} alt="" style={handleStylePost}/>
      <div class="image__overlay image__overlay--primary">
        <img className="styleProfilePicOverlay" alt="" src={profilepic} style={handleStyleProfile} />
          <div class="image__title">{userName}</div>
          <p class="image__description"> INFO: {pinContent} </p>
      </div>
    </div>
  );
};

export default PostImage;