import React, { useState, useEffect } from 'react'
import axios from "axios";
import  '../css/SearchBar.css'

const SearchBar = () => {
    const [list, setList] = useState([]);
    const [suggestion, setSuggest] = useState([]);
    const [search, setSearch] = useState("");
    
   const handleChange = (e) => {
        const value = e.target.value
        let suggestion = [];
        if(value.length > 0){
            const regex = new RegExp(`${value}`,`i`);
            suggestion=list.sort().filter(v=>regex.test(v));
        }
        setSuggest(suggestion);
        setSearch(value)
    }

    const handleSelected = (value) => {
        setSearch(value);
        setSuggest([])
    }

    const displaySuggestion = () => {
        if(suggestion.length === 0) {
            return null
        } else {
            return (
                <ul>
                    {suggestion.map((item)=><li key={item} onClick={()=>handleSelected(item)}>{item}</li>)}
                </ul>
            )
        }
    }

    const fetchData = async (url, setData) => {
        let res = await axios.get(url)
        
        try {
            res.data.payload.map((el) => {
                return setData(prevState => [...prevState ,el.tag_name])
            })
        } catch (err) {
            console.log(err)
        }
    }
    const handleSearch = (e) => {
        e.preventDefault();
        window.location="/pins/search-results"
        sessionStorage.searchTerm = e.target.elements[0].value
    }

    // useEffect(()=>{
    //     fetchData("http://localhost:3001/api/tags/all",setList)
    // }, [])

        return (
            <form onSubmit={handleSearch}>
            <input className="user-nav-search" placeholder="Search for whatever" value={search} type="text" onChange={handleChange} src="https://img.icons8.com/fluent/48/000000/search.png"/>
              {displaySuggestion()}
              {/* <button className="user-nav-search-btn" type="submit"> Search Tags </button> */}
            </form>
        )
    }

export default SearchBar;