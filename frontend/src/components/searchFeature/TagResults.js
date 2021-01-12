import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios'
import Tags from '../Tags'
import PostImage from '../HashtagResultImages/Image'
import { apiURL } from "../../util/apiURL";
import { AuthContext } from '../../providers/AuthProvider';
import Container from 'react-bootstrap/esm/Container';
import './css/tag-results.css'
const TagResults = () => {
    const API = apiURL();
    const { loading } = useContext(AuthContext);
    const [hashtagResults, setHashtagResults] = useState([]);
    const history = useHistory();
    // const tag_name = useParams()

    
    useEffect(()=>{
        const fetchTags = async () => {
            try {
                debugger
                let res = await axios.get(`${API}/api/tags/${sessionStorage.searchTerm}`);
                setHashtagResults(res.data.payload)
            } catch(err) {
                console.log(err.message);
                }
            };
            fetchTags();

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
        return (    
            <div style={{justifyContent:"center"}}>   
                <h1 className="now-viewing" style={{textAlign:"center"}}>Now viewing content based on #{sessionStorage.searchTerm}</h1>
                    <div className="backToFeed-btn-div">
                        <button className="backToFeed-btn" onClick={()=> handleNavigation("searchTerm")}>Return to my feed</button>
                    </div>
            </div>
        ) 
    } else {
        return (
            <div>
            {/* make this an else if and then make a null */}
                <h1>There are no results for #{sessionStorage.searchTerm} hashtag. Try searching for something else.</h1>
            </div>
        )
    }
}


    const displayPinsFromSearch = hashtagResults.map((pin, i) => {
        return (
            <div key={i} className="userPostsListDiv">
                <PostImage key={pin.id} pinId={pin.id} userName={pin.username} imageurl={pin.imageurl} profilepic={pin.profilepic} pinContent={pin.note}/>
                {/* <Tags/> */}
          </div>
        );
      });


    return (
            <Container className="tagResultsContainer">
                {searchResult()}
                    <div class="card-deck">
                        {displayPinsFromSearch}
                    </div>

            </Container>
    )
}

export default TagResults;