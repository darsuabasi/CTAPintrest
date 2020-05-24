import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Navbar.css'
// import SearchBar from '../components/SearchBar'
import { AuthContext } from '../providers/AuthContext'
// import Accounts from '../components/Accounts'
import { logout } from '../util/firebaseFunctions';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import Modal from './modal/Modal'



const Navbar = (params) => {


    const { currentUser } = useContext(AuthContext);

    const displayNavForUser = () => {
        if(currentUser) {
            // return <button onClick={accounts}>Accounts</button>;
            return ( 
               <nav>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/today"}>Today</NavLink>
                <NavLink to={"/following"}>Following</NavLink>
                {/* <SearchBar/> */}
                <NavLink to={"/notifications"}> Notifications </NavLink>
                <NavLink to={'/messages'}> Messages </NavLink>
                <NavLink to={"/user/boards"}> ProfilePic </NavLink>
                {/* <NavLink to={"accounts"}> AccountStuff</NavLink> */}  
                <button onClick={logout}>Logout</button>
            </nav>
            )
        } else {
            return(
                <nav className="publicNav">
                    <NavLink className="publicNavLink" to={"https://about.pinterest.com/en"}> About </NavLink>
                    <NavLink className="publicNavLink" to={"https://business.pinterest.com/"}> Business</NavLink>
                    <NavLink className="publicNavLink" to={"https://newsroom.pinterest.com/en"}> Blog </NavLink>
                    <div className="buttonDiv">
                        <button className="publicNavLogin" to={"/login"}> {Modal} Log in</button>
                        <button className="publicNavSignup" to={"/signup"} onClick={SignupModal}> Sign up </button>
                    </div>
                </nav>
            )
        }
    }
    return (
        <div> 
            <nav className="navbarUno">
                <ul className='pintrestLogoLetters'>Pintrest</ul>
                {displayNavForUser()}
            </nav>
        </div>
    )
}

export default Navbar;



