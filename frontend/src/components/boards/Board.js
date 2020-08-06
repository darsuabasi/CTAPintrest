import React from "react";
import "../../css/Post.css";

const Board = ({
  username,
  timestamp,
  board_image,
  board_description
}) => {
  timestamp = new Date();
  const date = timestamp.toDateString();
  return (
    <div className="postContainer">
      <h1>
        {username} posted on {date}
        <br></br>
      </h1>
      <img
        id="post_image"
        src={board_image}
        alt=""
        style={{ width: "400", height: "500px" }}
      ></img>
      <p>{board_description}</p>
    </div>
  );
};

export default Board;