import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import { apiURL } from '../../util/apiURL';
import { useInput } from '../../util/useInput'
import { AuthContext } from '../../providers/AuthProvider';
import PopulateBoards from './PopulateBoards'
import '../../css/CreatePin.css'


const CreatePin = () => {
    const { currentUser, token } = useContext(AuthContext);
    const API = apiURL();
    const [userId, setUserId] = useState("");
    const setBoard = useInput("");
    const setTag = useInput("");
    const setNote = useInput("");

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




    const handleNewPins = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append("myImage", file.raw);
            formData.append("file", file.preview);
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
            alert(newPin.data.message)
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
                    

                    {/* <input className="online-pic-link" placeholder="Save from site" disabled/> */}
                </div>



                <div className="main-note-for-pin-div"> 
                    <div className="choose-board"> 
                        <PopulateBoards/>
                    </div>

                    <div className="user-display">
                        {/* {user} */}
                    </div>

                    <div className="link-div">
                        <input className="link-input-style" placeholder="Which board is this going into?" {...setBoard} />  
                    </div>

                    <div className="about-div"> 
                        <textarea rows="5" cols="30" className="add-note-style" type="textarea" placeholder="Tell everyone what your Pin is about" {...setNote}/> 
                    </div>

                </div>


                {/* <label>
                    Add a tag #
                    <input type="text" placeholder="hash tag ##" name="hashtag" {...setTag} />
                </label>         */}




            </form>

        </div>
    )
}

export default CreatePin;