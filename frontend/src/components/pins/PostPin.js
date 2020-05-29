import React from "react";
import Likes from '../Likes';

const PostPin = ({ filePath, userName, profilePic, postContent, postId }) => {
  // const { filePath } = props;
  // const filePath = props.filePath

  // const handleStyleProfile = {
  //   heigh: "70px",
  //   width: "50px"
  // };
  const handleStylePin = {
    heigh: "400px",
    width: "500px"
  };

  return (
    <div title ={postId} className="individualPost">
      <h4 className="userName">{userName}</h4>
      {/* <img alt=" " src={profilePic} style={handleStyleProfile} /> */}

      <img alt="" src={filePath} style={handleStylePin} />
      <Likes postId={postId}/>
      <p>{postContent}</p>
    </div>
  );
};

export default PostPin;
