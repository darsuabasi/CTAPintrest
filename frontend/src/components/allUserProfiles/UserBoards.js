import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { apiURL } from "../../util/apiURL";
import PostBoardModal from '../boards/PostBoardModal';
// import  './css/userboards.css';

const UserBoards = ({username}) => {
    const API = apiURL();
    const { token, loading } = useContext(AuthContext);
    const [userBoards, setUserBoards] = useState([]);

    useEffect(() => {
        const fetchUserBoards = async () => {
            try {
                let res = await axios({
                    method: "get",
                    url: `${API}/api/users/${username}/boards`,
                    headers: {
                        AuthToken: token,
                    }
                })
                debugger
                setUserBoards(res.data.payload.allBoards)
                console.log(res.data)
            } catch(err) {
                setUserBoards([])
                console.log(err.message);
                }
            };
            fetchUserBoards();
    }, [username]);

    const userBoardList = userBoards.map((board, i) => {
        if (username === board.username)
          return (
            <div key={i}>
                <PostBoardModal key={board.boardId} boardId={board.boardId} board_name={board.board_name} imageurl={API+board.imageurl} creator_id={board.creator_id} board_description={board.board_description} username={board.username} />
            </div> 
          );
      });

      if (loading) return <div>Loading...</div>;
    
      return (
        <>
          <div className="user-pin-list-div">
            <div className="user-pin-div-setup"> 
              <h1 className="user-pins-now-viewing">Sorry, you can't view {username}'s Boards</h1>

            </div>

            <div style={{ width:'50vw'}} className="user-pins-now-displaying-layout">
              <h3 style={{color:"brown", width:'40vw'}}> This part of the app is under construction. Coming soon!</h3>
              {/* {userBoardList} */}
            </div>
          </div>
        </>
      );
    };

export default UserBoards;
