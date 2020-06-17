import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { apiURL } from "../util/apiURL";
import { useInput } from '../util/useInput';
import { AuthContext } from '../providers/AuthProvider';
import '../css/CreateBoard.css'


const CreateBoard = () => {
    const { currentUser, token } = useContext(AuthContext);
    const API = apiURL();
    const [userId, setUserId] = useState("");
    const boardName = useInput("");
    const boardDescription = useInput("");
    let hashtagObj=useInput("")


    // uploading image
    const [file, setFile] = useState({preview: "", raw: ""});

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
        if (e.target.files.length) {
            setFile({
              preview: URL.createObjectURL(e.target.files[0]),
              raw: e.target.files[0]
            });
          }
    }

                const handleNewBoards = async (e) => {
                    try {
                        e.preventDefault();
                        const formData = new FormData();
                        formData.append("myImage", file.raw);
                        formData.append("file", file.preview);
                        formData.append("board_name", boardName.value);
                        formData.append("board_description", boardDescription.value);
                        formData.append("creator_id", userId);
                        debugger
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



    const handleNewHashTag = async(data)=>{
        if(hashtagObj.value){
            let newHashTag = await axios.post(`http://localhost:3005/api/tags/`,{creator_id:data.creator_id, pin_id:data.id,tag_name:hashtagObj.value})
            console.log(newHashTag.data)
        }else{
            console.log("No Tag was added")
        }
    }

    return (
        <div className="create-board-div">

            <div>
                <h2 className="welcome-to-create-board"> Create your boards here</h2>
            </div>



                <form onSubmit={handleNewBoards} className="create-board-main-div">
                    <div>
                        </div>

                        <div className="uploadImageDiv"> 
                            <div className="image-preview2" id="imagePreview">  
                                <button className="save-button-style" type="submit"> Save </button>
                                <input className="image-preview-view" type="file" name="myImage" accept="image/png/jpeg" onChange={onSelectImage}/>
                                <img src="" alt="Image Preview" className="image-preview__image" src={file.preview}/>
                                {/* <span className="image-preview__default-text"> Drag and drop or click to upload </span>  */}
                            </div>
                        </div>




                <div className="main-note-for-board-div">
                    <div className="another-div-wow">
                        <div className="style-for-name-div">
                            <input className="board-name-place" placeholder="Board name" {...boardName}/>
                        </div>
                    
                        <div className="descrip-div">
                            <textarea className="board-description-place" placeholder="Board description" {...boardDescription}/>
                        </div>

                    </div>
                </div> 
                   
                    
                </form>
            {/* </div> */}



             


            

        </div>
    )


}

export default CreateBoard;