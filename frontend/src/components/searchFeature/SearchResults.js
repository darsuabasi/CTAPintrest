// import React, { useEffect, useState, useContext } from 'react'
// import axios from 'axios'
// import Tags from './Tags'
// import PostImage from './Image'
// import { apiURL } from "../../util/apiURL";
// import { AuthContext } from '../../providers/AuthProvider'

// const SearchResults = () => {
//     const [pins, setPins] = useState([]);
//     const API = apiURL();
//     const { token } = useContext(AuthContext);

//     const fetchAllPins = async () => {
//         try {
//             let res = await axios({
//                 method: "get",
//                 url: `${API}/api/pins`,
//                 headers: {
//                     AuthToken: token,
//                 }
//             })
//             // debugger
//             setPins(res.data.payload)
//         } catch(err) {
//             setPins([])
//             console.log(err.message);
//             }
//         };
//         fetchAllPins();

//         useEffect(()=>{
//             if(sessionStorage.searchTerm){
//                 fetchAllPins(`${API}/api/pins/tags/${sessionStorage.searchTerm}`)
//                 searchResult()
                
//             } else {
//                 fetchAllPins(`${API}/api//pins`)
//             }
//         }, [])

//     const searchResult = () => {
//         if(sessionStorage.searchTerm){
//         return <button onClick={()=>{sessionStorage.removeItem("searchTerm");window.location.reload()}}>Return to Homepage</button>
//     } else {
//         return null
//     }


//     const pinDisplay = pins.map(pin =>{
//         return (
//         <>
//             <PostImage key={pin.id} pinId={pin.id} userName={pin.username} filePath={pin.imageurl} postContent={pin.note}/>
//             <Tags pinId={pin.id} userName={pin.username}/>
//         </>)
// })

//     return (
//             <div>
//                 {searchResult()}
//                 {pinDisplay}
//             </div>

           
            
//         )
//     }
// }

// export default SearchResults;