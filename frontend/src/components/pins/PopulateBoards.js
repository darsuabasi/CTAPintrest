import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { apiURL } from '../../util/apiURL';
import { AuthContext } from '../../providers/AuthProvider';
import CreateBoard from '../CreateBoard';



const PopulateBoards = () => {

    const { token, currentUser } = useContext(AuthContext);
    const [boards, setBoards] = useState([]); 
    const API = apiURL();

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



    const selectOptions = boards.map((el, i) => {
        return <option key={i} value={el.id}> {el.board_name} w/ ID {el.id} </option>
    })

    const handleBoards = (e) => {
        e.preventDefault();
        setBoards(e.target.value);
    }

    const handleCreateBoard = (e) => {
        e.preventDefault();
        return <Link to={CreateBoard}> </Link>
    }

   


    return (   
            <div> 
                <select>
                    <option defaultValue> Select a Board </option>
                    <option onSubmit={handleCreateBoard}> Create a Board </option>
                    <option> ------------------------ </option>
                        {selectOptions}
                </select>
            </div> 
       
    )
} 


export default PopulateBoards;