import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { apiURL } from '../../util/apiURL';
import { AuthContext } from '../../providers/AuthProvider'
import SingleHomePin from './SingleHomePin'
import Tags from '../Tags'
import gucciDenim from '../../assets/gucciDenim.jpeg';
import redMakeupLook from '../../assets/redMakeupLook.jpeg';
import jewels from '../../assets/jewels.jpeg';
import oldGlamLooks from '../../assets/oldGlamLooks.jpeg';
import goldDress from '../../assets/goldDress.jpeg';
import tropicalFit from '../../assets/tropicalFit.jpeg';
import versaceShoe from '../../assets/versaceShoe.jpeg';
import whiteTwoPiece from '../../assets/whiteTwoPiece.jpeg';
import { Link } from 'react-router-dom';
import AllPinsDisplay from '../AllPinsDisplay';
import Pin from '../pins/allPins/Pin';
import DisplayPins from '../DisplayPins';
import '../../css/Home.css'




const Home = () => {
    // const API = apiURL();
    // useEffect(() => {
        const [pins, setPins] = useState([]);
        const API = apiURL();
        const { token } = useContext(AuthContext);
        // const { currentUser, token } = useContext(AuthContext);

        // useEffect(() => {
            const fetchAllPins = async () => {
                try {
                    // debugger
                    let res = await axios({
                        method: "get",
                        url: `${API}/api/pins`,
                        headers: {
                            AuthToken: token,
                        }
                    })
                    debugger
                    setPins(res.data.payload)
                    console.log(res.data)
                } catch(err) {
                    setPins([])
                    console.log(err.message);
                    }
                };
                // fetchPins();

        // }, [])

       
    
    const searchResults = () => {
        if(sessionStorage.searchTerm) {
            return <button onClick={()=>{sessionStorage.removeItem("searchTerm");window.location.reload()}}> Return to Your Feed </button>
        } else {
            return null
        }
    }

    useEffect(()=>{
        if(sessionStorage.searchTerm){
            fetchAllPins(`${API}/api/pins/tags/${sessionStorage.searchTerm}`)
            searchResults()
            
        } else {
            fetchAllPins(`${API}/api//pins`)
        }
    }, [])

    

    const pinDisplay = pins.map(pin =>{
        return (
        <>
            <Pin key={pin.id} id={pin.id} pinId={pin.id} userName={pin.username} filePath={pin.imageurl} postContent={pin.note}/>
            <Tags pinId={pin.id} userName={pin.username}/>
        </>)
})

   return(
        <div className="homeDiv">

            <div className='homeDiv'>
                <nav className="navbar">
                    

                    <div className="pintrestDiv"> 
                        {/* <h1>Pintrest</h1> */}
                    </div>


                    <div className="dropdown">
                        <button class="circular ui icon button" className="create-btn"> D </button>
                            <div className="add-dropdown-content">
                                <Link className="style-create-board-dropdown" to={"/create-board"} > Create Board </Link>
                                <Link className="style-create-pin-dropdown" to={"/create-pin"} > Create Pin </Link>
                            </div>
                    </div>

                </nav>
         
            </div>


                    <div className="main4Pins">
                        <AllPinsDisplay/>
                    </div>

             <div className="container-fluid d-flex justify-content center"> 
                {/* <div className="row">

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

                </div> */}
            </div>   
        </div>
    )
}

export default Home;