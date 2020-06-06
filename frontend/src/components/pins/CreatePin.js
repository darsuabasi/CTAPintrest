import React, { useState, useContext, useEffect, /*useEffect*/ } from 'react';
import axios from 'axios'
import { apiURL } from '../../util/apiURL';
import { Link, useHistory } from 'react-router-dom'
import { useInput } from '../../util/useInput'
import { AuthContext } from '../../providers/AuthProvider';


// import Home from '../home/Home'
import './CreatePin.css'
// import '../css/ImageUpload.css';

// import PopulateBoards from './PopulateBoards'


const CreatePin = () => {
    const { currentUser, token } = useContext(AuthContext);
    const API = apiURL();
    const [userId, setUserId] = useState("");
    // const [newPin, setNewPin] = useState("")
    const setBoard = useInput("");
    const setTag = useInput("");
    const setNote = useInput("");
    const history = useHistory("");

// uploading image
    const [file, setFile] = useState('');
    const [imagePath, setImagePath] = useState('');

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




    const handleNewPins = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append("myImage", file);
            formData.append("creator_id", userId);
            formData.append("board_id", setBoard.value)
            formData.append("note", setNote.value);
            debugger
            const config = {
              headers: {
                "content-type": "multipart/form-data",
              },
            }
            let newPin = await axios.post(`${API}/api/pins/`, formData, config);
            console.log(newPin.data)
            console.log(`New pin successfully created + saved to @boardName`)
            // setNewPin(newPin);
            setTimeout(function() {
              window.location = "/user-feed";
            },1000) 
          } catch (err) {
            console.log(err)
          }
        }
        
        //  ----------------------------------------------------------------------------------------

   

    // const handleNewTag = async (data)=>{
    //     if(setTag.value){
    //         let newTag = await axios.post(`${API}/api/hashtags/`, {formData, config});
    //         console.log(newTag.data)
    //     } else {
    //         console.log("No tag was added")
    //     }
    // }


    
    return (
        <div className="create-pin-div"> 

            <form onSubmit={handleNewPins} className="create-pin-main-div"> 
                <div className="drop-down-div">
                    {/* drop down bar for Boards with save button */}
                    {/* <select className="board-select-options" onChange={handleBoards}>
                            <option defaultValue="Select"> Select </option>
                            {selectOptions}
                    </select> */}
                    {/* <PopulateBoards/> */}
                    <button className="save-button-style" type="submit"> Save </button>

                </div>

                <div className="uploadImageDiv"> 


                    <div className="image-preview" id="imagePreview"> 
                        <img src="" alt="Preview" className="image-preview__image"/> 
                        <input type="file" name="myImage" accept="image/png/jpeg" onChange={onSelectImage} />
                        {/* <span className="image-preview__default-text"> Drag and drop or click to upload</span>  */}
                    </div>
                    

                    <input className="online-pic-link" placeholder="Save from site" disabled/>
                </div>



                <div className="main-note-for-pin-div"> 
                    <div className="title-div"> 
                        <input className="add-title-style" type="text" placeholder="Add your title" disabled/> 
                    </div>

                    <div className="user-display">
                        {/* {user} */}
                    </div>

                    <div className="about-div"> 
                        <input className="add-note-style" type="text" placeholder="Tell everyone what your Pin is about" {...setNote}/> 
                    </div>
                </div>


                <div className="link-div">
                    <input className="link-input-style" placeholder="Which board do you want this to go into?" {...setBoard} />  
                </div>


                <label>
                    Add a tag #
                    <input type="text" placeholder="hash tag ##" name="hashtag" {...setTag} />
                </label>        




            </form>

        </div>
    )
}

export default CreatePin;