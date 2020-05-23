import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div> 
            <nav>
                <NavLink exact to={"/"}>Home</NavLink>
                <NavLink to={"/following"}>Following</NavLink>
                <NavLink to={"/login"}>Login</NavLink>
                <NavLink to={"/sign"}>Sign-up</NavLink>
            </nav>
        </div>
    )
}

export default Navbar;