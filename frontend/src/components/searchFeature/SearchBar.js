import React, { useState, useEffect } from 'react';
import { apiURL } from '../../util/apiURL';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import  '../../css/SearchBar.css'

const SearchBar = () => {
    const API = apiURL();
    const history = useHistory();
    const [list, setList] = useState([]);
    const [suggestion, setSuggestion] = useState([]);
    const [search, setSearch] = useState("");
    
    const handleChange = (e) => {
        const value = e.target.value
        let suggestion = [];
        if(value.length > 0){
            const regex = new RegExp(`${value}`,`i`);
            suggestion = list.sort().filter(v=>regex.test(v));
        }
        setSuggestion(suggestion);
        setSearch(value)
    }

    const handleSelect = (value) => {
        setSearch(value);
        setSuggestion([])
    }

    const displaySuggestion = () => {
        if(suggestion.length === 0) {
            return null
        } else {
            return (
                <ul>
                    {suggestion.map((item)=><li key={item} onClick={()=> handleSelect(item)}>{item}</li>)}
                </ul>
            )
        }
    }

    const fetchData = async (url, setData) => {
        let res = await axios.get(url)
        try {
            res.data.payload.map((el) => {
                return setData(prevState => [...prevState, el.tag_name])
            })
        } catch (err) {
            console.log(err)
        }
    }
    const handleSearch = (e) => {
        e.preventDefault();
        // window.location="/pins/search-results"
        history.push("/pins/search-results")
        sessionStorage.searchTerm = e.target.elements[0].value
    }

    useEffect(()=>{
        fetchData(`${API}/api/tags/`, setList)
    }, [])

        return (
            <form onSubmit={handleSearch}>
            <input className="user-nav-search" placeholder="Search for whatever" value={search} type="text" onChange={handleChange} src="https://img.icons8.com/fluent/48/000000/search.png"/>
              {displaySuggestion()}
              {/* <button className="user-nav-search-btn" type="submit"> Search Tags </button> */}
            </form>
        )
    }

export default SearchBar;