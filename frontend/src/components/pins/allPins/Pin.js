import React from "react";
import Tags from '../../Tags';

const Pin = ({
  id,
  username,
  timestamp,
  imageUrl,
  note
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
        id="imageUrl"
        src={imageUrl}
        alt=""
        style={{ width: "400", height: "500px" }}
      ></img>
      <p>{note}</p>
      <div className="hashtag">
        <Tags id={id} />
      </div>
    </div>
  );
};

export default Pin;