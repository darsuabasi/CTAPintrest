import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { apiURL } from '../../util/apiURL';
import { useInput } from '../../util/useInput';
import { AuthContext } from '../../providers/AuthProvider';
import PopulateBoards from './PopulateBoards'
import '../../css/CreatePin.css'


const CreatePin = () => {
    const { currentUser, token } = useContext(AuthContext);
    const API = apiURL();
    const [userId, setUserId] = useState("");
    const [boardId, setBoardId] = useState("");
    const [newPins, setNewPins] = useState([]);
    const setTag = useInput("");
    const setNote = useInput("");
    const history = useHistory();

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

//   refactor this bc we already have current user id 


  const onSelectImage = (e) => {
    if (e.target.files.length) {
        setFile({
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0]
        });
      }
}



    const handleNewPins = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("myImage", file.raw);
            formData.append("file", file.preview);
            formData.append("creator_id", userId);
            formData.append("board_id", boardId);
            formData.append("note", setNote.value);
            formData.append("tag_name", setTag.value);
            const config = {
              headers: {
                "content-type": "multipart/form-data",
              },
            }
            let newPin = await axios.post(`${API}/api/pins/`, formData, config);
            debugger
            console.log(newPin.data)
            handleNewTag(newPin.data.post)
            history.push("/user-feed");
        } catch (err) {
            console.log(err)
        }
    }


    const handleNewTag = async(data) => {
        if(setTag.value){
            let newTag = await axios.post(`${API}/api/tags/`, {creator_id: data.creator_id, pin_id:data.id, board_id:data.board_id, tag_name:setTag.value});
            console.log(newTag.data.post)
        } else {
            console.log("No hashtag was added")
        }
    }


//  ----------------------------------------------------------------------------------------
    
    return (
        <div className="create-pin-div"> 

            <div>
                <h2 className="welcome-to-create-pin"> Create your pins here</h2>
            </div>


            <form onSubmit={handleNewPins} className="create-pin-main-div"> 
                <div className="drop-down-div">
                </div>

                <div className="uploadImageDiv">

                    <div className="image-preview" id="imagePreview"> 
                      <button className="save-button-style" type="submit"> Save </button>
                      <input className="input-style-yeah" type="file" name="myImage" accept="image/png/jpeg" onChange={onSelectImage} />
                      <img src="" alt="Preview" src={file.preview} className="image-preview__image"/> 
                        {/* <span className="image-preview__default-text"> Drag and drop or click to upload</span>  */}
                    </div>
                    
                </div>



                <div className="main-note-for-pin-div"> 
                    <div className="choose-board"> 
                        <PopulateBoards boardId={boardId} setBoardId={setBoardId}/>
                        {/* passing the props child/parent */}
                    </div>

    
                    <input className="style-hashtag-input" type="text" placeholder="Add hashtags..." {...setTag} />
                
                    <div className="user-display">
                        {/* {user} */}
                    </div>

                    <div className="about-div"> 
                        <textarea rows="5" cols="30" className="add-note-style" type="textarea" placeholder="Tell everyone what your Pin is about" {...setNote}/> 
                    </div>

                </div>

            </form>

        </div>
    )
}

export default CreatePin;