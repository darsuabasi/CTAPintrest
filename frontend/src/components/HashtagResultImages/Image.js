import React, { useState, useEffect }  from "react";
import { useHistory } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from '../../providers/AuthProvider';
// import { apiURL } from '../../util/apiURL';
import './images.css';

const PostImage = ({ imageurl, userName, profilepic, pinContent, pinId, tag_name }) => {

    const history = useHistory();
    const userNameRedirect = (userName) => history.push(`/users/${userName}/pins`);
    // const [tags, setTags] = useState([]);
    // const API = apiURL();

    // const fetchTags = async () => {
    //   try {
    //     let res = await axios.get(`${API}/api/tags/${sessionStorage.searchTerm}`);
    //     setTags(res.data.payload);
    //   } catch (error) {
    //     setTags([]);
    //   }
    // };
  
  
    // useEffect(() => {
    //   fetchTags(`${API}/api/tags/${pinId}`);
    // }, [] );

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
        <img onClick={() => userNameRedirect(userName)}  className="styleProfilePicOverlay" alt="" src={profilepic} style={handleStyleProfile} />
          <div onClick={() => userNameRedirect(userName)} class="image__title">{userName}</div>
          <p class="image__description"> <p>{pinContent}</p></p>
          {/* <p> {tag_name} </p> */}
      </div>
    </div>
  );
};

export default PostImage;