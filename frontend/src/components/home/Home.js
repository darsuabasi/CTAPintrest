import React, { useState, useEffect } from 'react';
import axios from 'axios'
// import '../css/Home.css';
// import SearchBar from '../components/SearchBar'
// import Pin from './pins/AllPins'
import SingleHomePin from './SingleHomePin'
import Tags from '../Tags'
// import SearchBar from '../SearchBar';
// import UserInformation from '../EditProfile';


import gucciDenim from '../../assets/gucciDenim.jpeg';
// import bigHair from '../../assets/bigHair.jpeg';
import redMakeupLook from '../../assets/redMakeupLook.jpeg';
import jewels from '../../assets/jewels.jpeg';
import oldGlamLooks from '../../assets/oldGlamLooks.jpeg';
// import closetK from '../../assets/closetK.jpeg';
import goldDress from '../../assets/goldDress.jpeg';
// import longHair from '../../assets/longHair.jpeg';
// import orangeEyes from '../../assets/orangeEyes.jpeg';
// import orangeHanifa from '../../assets/orangeHanifa.jpeg';
// import slashedByTia from '../../assets/slashedByTia.jpeg';
import tropicalFit from '../../assets/tropicalFit.jpeg';
// import twoToneHair from '../../assets/twoToneHair.jpeg';
import versaceShoe from '../../assets/versaceShoe.jpeg';
// import whiteDress from '../../assets/whiteDress.jpeg';
import whiteTwoPiece from '../../assets/whiteTwoPiece.jpeg';


import PostImage from '../../components/Image'
// import EditProfile from '../EditProfile';
import { NavLink } from 'react-router-dom';
import CreatePinModal from '../CreatePinModal'




const Home = () => {
    const [pins, setPins] = useState([]);

    const fetchPins = async (url) =>{
        try {
            let res = await axios.get(url);
            // debugger
            setPins(res.data.payload)
        } catch(err) {
            setPins([])
        }
    }

    const searchResult =()=>{
        if(sessionStorage.searchTerm){
            return <button onClick={()=>{sessionStorage.removeItem("searchTerm");window.location.reload()}}>Return to Homepage</button>
        } else {
            return null
        }
    }

    useEffect(()=>{
        if(sessionStorage.searchTerm){
            fetchPins(`http://localhost:3002/pins/tags/${sessionStorage.searchTerm}`)
            searchResult()
            
        } else {
            fetchPins('http://localhost:3002/pins')
        }
    }, [])

    const pinDisplay = pins.map(pin =>{
            return (<><PostImage key={pin.id} pinId={pin.id} userName={pin.username} filePath={pin.imageurl} postContent={pin.note}/>
                    <Tags pinId={pin.id} userName={pin.username}/>
                </>)


// const handleLogOut = () => {
//     sessionStorage.removeItem("loginedUser")
//     sessionStorage.removeItem("searchTerm")
//     }
})


   return(
        <div className="homeDiv">

            <div className='homeDiv'>
                <nav className="navbar">
                    

                    <div className="pintrestDiv"> 
                        {/* <h1>Pintrest</h1> */}
                    </div>

                    <div className="allLinks">
                        <NavLink className="upload" exact to={'/upload'} component={CreatePinModal}> + </NavLink>
                        {/* <NavLink className="picToSettings" exact to={'/settings'}>Pic Here</NavLink> */}
                        {/* <NavLink className="logOut" exact to={"/"}>Log Out</NavLink> */}
                    </div>
                </nav>
            


                <div className="userInfoContainer">
                    {/* <div className="userInfo split">
                        <EditProfile/>
                    </div> */}
                    <div className="feed split">
                        {searchResult()}
                        {pinDisplay}
                    </div>
                </div>
            </div>





             <div className="container-fluid d-flex justify-content center"> 
                <div className="row">

                    <div className="col-md-3">
                        <SingleHomePin imgsrc={gucciDenim} title="Gucci Denim" username="lovelyTelly" />
                    </div>

                    <div className="col-md-3">
                        <SingleHomePin imgsrc={redMakeupLook} title="Intense"/>
                    </div>

                    <div className="col-md-3">
                        <SingleHomePin imgsrc={jewels} title="The finer things" username="Jamilaj" />
                    </div>

                    <div className="col-md-3">
                        <SingleHomePin imgsrc={goldDress} title="Travel" />
                    </div>

                    <div className="col-md-3">
                        <SingleHomePin imgsrc={whiteTwoPiece} title="Princessa" />
                    </div>
                
                    <div className="col-md-3">
                        <SingleHomePin imgsrc={versaceShoe} title="Versace Versace Versace" />
                    </div>

                    <div className="col-md-3">
                        <SingleHomePin imgsrc={oldGlamLooks} title="Serving glam" username="xoxoDarsu"/>
                    </div>


                    <div className="col-md-3 col-sm-6"> 
                        <SingleHomePin imgsrc={tropicalFit}/>
                    </div>

                </div>
            </div>   
        </div>
    )
}

export default Home;