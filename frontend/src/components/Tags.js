import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from '../providers/AuthProvider';
import { apiURL } from "../util/apiURL";


const Tags = ({ token }) => {
  // const { currentUser, token } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const API = apiURL();

  const fetchTags = async (url) => {
    try {
      let res = await axios.get(url);
      setTags(res.data.payload);
    } catch (error) {
      setTags([]);
    }
  };


  useEffect(() => {
    fetchTags(`${API}/api/tags/`);
  }, /* [] */ );


  const getAllTags = tags.map(tag => {
    let arrayTag = [];
    arrayTag.push(tag.tag_name);

    return <p className="singleTag"> #{arrayTag} </p>;
  });
  return <div className="allTags">{getAllTags}</div>;

};
export default Tags;
