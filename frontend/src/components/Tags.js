import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from '../providers/AuthProvider';
import { apiURL } from "../util/apiURL";


const Tags = ({ pinId }) => {
  // const { currentUser, token } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const API = apiURL();

  const fetchTags = async () => {
    try {
      let res = await axios.get(`${API}/api/tags/${sessionStorage.searchTerm}`);
      setTags(res.data.payload);
    } catch (error) {
      setTags([]);
    }
  };


  useEffect(() => {
    fetchTags(`${API}/api/tags/${pinId}`);
  }, [] );


  const getAllTags = tags.map(tag => {
    let arrayTag = [];
    arrayTag.push(tag.tag_name);
    return <p className="singleTag"> #{arrayTag} </p>;
  });

  return <div className="allTags"> <a href="`${getAllTags}`"> {getAllTags} </a> </div>;

};
export default Tags;
