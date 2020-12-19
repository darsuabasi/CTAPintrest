import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from '../providers/AuthProvider';
import { apiURL } from "../util/apiURL";
import { useParams } from "react-router-dom";



const Tags = () => {
  // const { currentUser, token } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const API = apiURL();
  const id = useParams()

  const fetchAllTagsByPin = async () => {
    try {
      let res = await axios.get(`${API}/api/pins/${id}/tags`);
      setTags(res.data.payload);
    } catch (error) {
      setTags([]);
    }
  };

  useEffect(() => {
    fetchAllTagsByPin();
  }, [] );


  const getAllTags = tags.map(tag => {
    let hashtagArr = [];
    hashtagArr.push(tag.tag_name);
    return <p className="singleTag"> #{hashtagArr} </p>;
  });

  return <div className="allTags"> <a href="`${getAllTags}`"> {getAllTags} </a> </div>;

};
export default Tags;
