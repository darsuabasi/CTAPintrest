import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Navbar.css'
import SearchBar from '../components/SearchBar'

const Navbar = () => {
    return (
        <div> 
            <nav className="navbarUno">
                <NavLink exact to={"/"}>P-Logo</NavLink>
                <NavLink exact to={"/"}>Home</NavLink>
                <NavLink to={"/today"}>Today</NavLink>
                <NavLink to={"/following"}>Following</NavLink>
                {/* <SearchBar/> */}
                <NavLink to={"/notifications"}> Notifications </NavLink>
                <NavLink to={'/messages'}> Messages </NavLink>
                <NavLink to={"/user/boards"}> ProfilePic </NavLink>
                <NavLink to={"accounts"}> AccountStuff</NavLink>
            </nav>
        </div>
    )
}

export default Navbar;