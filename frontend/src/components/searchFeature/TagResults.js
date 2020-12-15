import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios'
import Tags from '../Tags'
import PostImage from '../Image'
import { apiURL } from "../../util/apiURL";
import { AuthContext } from '../../providers/AuthProvider'

const TagResults = () => {
    const API = apiURL();
    const { loading } = useContext(AuthContext);
    const [hashtagResults, setHashtagResults] = useState([]);
    // const { token } = useContext(AuthContext);
    const { value } = useParams();
    const history = useHistory();

    
    useEffect(()=>{
        const fetchTags = async () => {
            try {
                debugger
                let res = await axios.get(`${API}/api/tags/${sessionStorage.searchTerm}`);
                setHashtagResults(res.data.payload)
            } catch(err) {
                // setHashtagResults([])
                console.log(err.message);
                }
            };
            fetchTags();

            // sessionStorage.searchTerm
            if(sessionStorage){
                fetchTags(`${API}/api/tags/${sessionStorage}`) /*sessionStorage.searchTerm*/
                searchResult()
            } else {
                fetchTags(`${API}/api/tags`)
            }
        }, [])


        const handleNavigation = (e) => {
            // e.preventDefault();
            history.push("/user-feed")
        }

    const searchResult = () => {
        if(sessionStorage.searchTerm){
        return <button onClick={()=> handleNavigation("searchTerm")}>Return to my feed</button>
    } else {
        return null
    }
}

    //     const searchResult = () => {
    //         if(sessionStorage.searchTerm){
    //         return <button onClick={()=>{sessionStorage.removeItem("searchTerm");window.location.reload()}}>Return to Homepage</button>
    //     } else {
    //         return null
    //     }
    // }




    const displayPinsFromSearch = hashtagResults.map((pin, i) => {
        return (
            <div key={i} className="userPostsListDiv">
                <PostImage key={pin.id} pinId={pin.id} userName={pin.username} filePath={pin.imageurl} postContent={pin.note}/>
                <Tags pinId={pin.id} userName={pin.username}/>
          </div>
        );
      });


//     const displayPinsFromSearch = hashtagResults.map(pin =>{
//         return (
//             <div>
//                 <PostImage key={pin.id} pinId={pin.id} userName={pin.username} filePath={pin.imageurl} postContent={pin.note}/>
//                 <Tags pinId={pin.id} userName={pin.username}/>
//             </div>)
// })

    return (
            <div>
                {searchResult()}
                {displayPinsFromSearch}
            </div>

           
            
        )
}

export default TagResults;