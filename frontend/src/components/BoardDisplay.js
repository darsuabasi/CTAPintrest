import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PostBoardModal from './PostBoardModal';
import '../css/BoardList.css';

import { apiURL } from '../util/apiURL';
import { AuthContext } from '../providers/AuthProvider';


const BoardDisplay = () => {
    const API = apiURL(); 
    const [boards, setBoards] = useState([]);
    const { token, currentUser } = useContext(AuthContext);


    useEffect(() => {
        const fetchBoardsBySingleUser = async () => {
            try {
                let res = await axios({
                    method: "get",
                    url: `${API}/api/users/${currentUser.uid}/boards`,
                    headers: {
                        AuthToken: token,
                    }
                })
                setBoards(res.data.payload.allBoards)
                console.log(res.data)
            } catch(err) {
                setBoards([])
                console.log(err.message);
                }
            };
            fetchBoardsBySingleUser();
    }, [])

    const displayBoard = boards.map(board => {
        return ( <PostBoardModal key={board.id} boardId={board.id} creator_id={board.creator_id} board_name={board.board_name} imageurl={API+board.board_image} board_description={board.board_description}/> )
    })

   return (
       <div className="boardCard">
            {displayBoard}
       </div>
   )

}

export default BoardDisplay;

