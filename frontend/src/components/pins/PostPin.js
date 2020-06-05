import React from "react";
import Likes from '../Likes';

const PostPin = ({ filePath, userName, pinContent, postId }) => {
  // const { filePath } = props;
  // const filePath = props.filePath

  // const handleStyleProfile = {
  //   heigh: "70px",
  //   width: "50px"
  // };
  const handleStylePin = {
    height: "400px",
    width: "400px",
    border: "1px solid #000000"
  };

  return (
    <div title ={postId} className="individualPost">
      <h4 className="userName">{userName}</h4>
      {/* <img alt=" " src={profilePic} style={handleStyleProfile} /> */}

      <img alt="" imgsrc={filePath} style={handleStylePin} />
      {/* <Likes postId={postId}/> */}
      <p>{pinContent}</p>
    </div>
  );
};

export default PostPin;
