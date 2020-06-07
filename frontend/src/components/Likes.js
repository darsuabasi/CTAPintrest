import React, { useState, useEffect } from "react";
import axios from "axios";

const Likes = ({ postId }) => {

    const [pinLikes, setPinLikes] = useState([]);
    const [pinLikesArr, setPinLikesArray] = useState(null)

    const fetchPinLikes = async (url) => {
      try {
          let res = await axios.get(url);
          setPinLikes(res.data.payload.length);
          setPinLikesArray(res.data.payload)
        } catch (error) {
            setPinLikes([]);
        }
    };

    const PinButton = async (e) => {
        if(e.target.innerText === "Pin") {
            e.target.innerText = "Un-pin";
            try {
               let res = await axios.post(`http://localhost:3002/likes/${sessionStorage.loginedUser}/${postId}`);
               fetchPinLikes(`http://localhost:3002/likes/${res.data.payload.pin_id}`)
            } catch (err) {
              console.log(err);
            }
        } else {
            e.target.innerText = "Pin";
            try {
                let res = await axios.delete(`http://localhost:3002/likes/${sessionStorage.loginedUser}/${postId}`);
                fetchPinLikes(`http://localhost:3002/likes/${res.data.payload.post_id}`)
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        fetchPinLikes(`http://localhost:3002/likes/${postId}`)
    }, []);

    const isLiked = (arr) => {
        return arr.every(e => {
            return e.liker_id !== sessionStorage.loginedUser
        })
    }

    return (
        <div className="has-pinned">
            {   
                pinLikesArr ?
                    isLiked(pinLikesArr) ?
                        <button onClick={PinButton}>Pin</button>
                    :
                        <button onClick={PinButton}>Un-pin</button>
                : null
            }
            <p>{pinLikes}</p>
        </div>
    )
};

export default Likes;

