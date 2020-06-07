import React from "react";
// import Likes from './Likes';

const PostImage = ({ filePath, userName, profilePic, postContent, postId }) => {
  const handleStyleProfile = {
    heigh: "70px",
    width: "50px"
  };
  const handleStylePost = {
    heigh: "400px",
    width: "500px"
  };

  return (
    <div title ={postId} className="individualPost">
      <h4 className="userName">{userName}</h4>
      <img alt=" " src={profilePic} style={handleStyleProfile} />

      <img alt="" src={filePath} style={handleStylePost} />
      {/* <Likes postId={postId}/> */}
      <p>{postContent}</p>
    </div>
  );
};

export default PostImage;