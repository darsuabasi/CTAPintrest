import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { apiURL } from "../util/apiURL";
import { useInput } from '../util/useInput';

import { AuthContext } from '../providers/AuthProvider';
import { useHistory } from 'react-router-dom';

import '../css/CreateBoard.css'


const CreateBoard = () => {
    const [userId, setUserId] = useState("");
    const { currentUser, token } = useContext(AuthContext);
    const API = apiURL();
    let hashtagObj=useInput("")
    const boardName = useInput("");
    const boardDescription = useInput("");
    const [board, setBoard] = useState([]);
    const history = useHistory("");

    // uploading image
    const [file, setFile] = useState('hello whats up');
    const [boardImage, setBoardImagePath] = useState('');

    useEffect(() => {
        const getUser = async () => {
            try {
                let res = await axios({
                    method: "get",
                    url: `${API}/api/users/${currentUser.uid}`,
                    headers: {
                        AuthToken: token,
                    },
                })
                setUserId(res.data.getUser.id)
            } catch (err) {
                console.log(err.message);
            }
        };
        getUser(); 
    }, [])

     


    const onSelectImage = (e) => {
        setFile(e.target.files[0]);
    }
    
    
    // const showImage = (e) => {
        //     let file = e.currentTarget.files[0];
        //     setBoardImage(file);
        //     let fileReader = new FileReader();
        //     fileReader.onloadend = () => {
            //         setImageUrl(fileReader.result)
            //     };
            //     if(file) {
                //         fileReader.readAsDataURL(file);
                //     }
                // };
                const handleNewBoards = async (e) => {
                    try {
                        e.preventDefault();
                        const formData = new FormData();
                        formData.append("myImage", file);
                        formData.append("board_name", boardName.value);
                        formData.append("board_description", boardDescription.value);
                        formData.append("creator_id", userId);
                        // console.log(file)
    
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }
            let newBoard = await axios.post(`${API}/api/boards/`, formData, config)
            console.log(newBoard.data)
            console.log("New board was created")
            setTimeout(function() {
            window.location = "/user-profile/boards";
            },1000) 
        } catch (err) {
            console.log(err)
        }
    }



    const handleNewHashTag =async(data)=>{
        if(hashtagObj.value){
            let newHashTag = await axios.post(`http://localhost:3005/api/tags/`,{creator_id:data.creator_id, pin_id:data.id,tag_name:hashtagObj.value})
            console.log(newHashTag.data)
        }else{
            console.log("No Tag was added")
        }
    }

    return (
        <div className="board-page">


            <div className="uploadImageDiv"> 
            
                
            </div>

            <div className="create-board-form">
                <form onSubmit={handleNewBoards} className="create-board-form">
                <div className="image-preview" id="imagePreview">  
                    <input className="image-preview-view" type="file" name="myImage" accept="image/png/jpeg" onChange={onSelectImage} />
                    <span className="image-preview__default-text"> Drag + drop or click to upload a board image</span> 
                </div>
                    {/* <input type="submit" value="Upload!" className="file-upload-button"/> */}

                <div>
                    {/* <img src={files} alt="Preview" className="image-preview__image"/>  */}
                    {/* {images} */}
                </div> 



                    <input className="board-name-place" placeholder="Board name" {...boardName}/>
                    <br/>
                    <textarea className="board-description-place" placeholder="Board description" {...boardDescription} />
                    {/* <input type="file"/> */}
                    <br/>
                    <button type="submit"> Save </button>
                    
                </form>
            </div>



             


            

        </div>
    )


}

export default CreateBoard;