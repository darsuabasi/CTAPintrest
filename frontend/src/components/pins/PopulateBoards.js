import React, { useState, useEffect } from "react";
import axios from 'axios';
// import PokemonDisplay from "./PokemonDisplay";
import { Link } from 'react-router-dom'
import { apiURL } from '../../util/apiURL';
// import '../Css/GetPokemonTypes.css'

const PopulateBoards = () => {

    const [optionValue, setOptionValue] = useState([])
    const [boards, setBoards] = useState([]); 
    // act like the type of board so board
    const [pins, setPins] = useState([]);
    // act like the photos so yeah
    const API = apiURL();

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                let res = await axios.get(`${API}/api/boards/`)
                let data = res.data.results
                setOptionValue(data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchBoards();
    }, [])



    const selectOptions = optionValue.map((el, i) => {
        return <option key={i} value={el.board_name}> {el.board_name} </option>
    })

    const handleBoardPins = (e) => {
        setBoards(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.get(`${API}/boards/${boards}`)
            setPins(res.data)
        } catch (err) {
            console.log(err)
            setPins([])
        }
    }

    const listPins = pins.map(pins4Board => {
        // let { id } = 
        return <Link to={"/pins"}> 
            <li> 
                <li id={pins4Board.pins.id} className="pinCards">{pins4Board.pins.imageUrl} {pins4Board.pins.note} </li>
            </li> 
               </Link>
    })

    const takeToHome = (e) => {
        e.preventDefault();
        return <Link to={"/user-profile"}> </Link>
    }


    return (
        // <div className="mainDiv"> 
            <div className="selectTagDiv">     
                <h1> Boards </h1>
                <div>
                    <div onSubmit={handleSubmit}> 
                        <select onChange={handleBoardPins}>
                            <option defaultValue> Select a Board </option>
                            {selectOptions}
                        </select>
                        <button type="submit" onSubmit={takeToHome}>  Submit </button>
                    </div> 
                        <div> 
                            <ul className="pokemonList"> 
                            {listPins} 
                            </ul>
                        </div>
                </div>
            </div>
        // </div>
    )
} 


export default PopulateBoards;