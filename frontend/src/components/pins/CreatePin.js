import React, { useState, useContext, useEffect, /*useEffect*/ } from 'react';
import axios from 'axios'
import { apiURL } from '../../util/apiURL';
import { Link, useHistory } from 'react-router-dom'
import { useInput } from '../../util/useInput'
import { AuthContext } from '../../providers/AuthProvider';
import { useDropzone } from 'react-dropzone'

// import Home from '../home/Home'
import './CreatePin.css'
// import '../css/ImageUpload.css';

import { /*ToastContainer, */ toast } from "react-toastify";
// import PopulateBoards from './PopulateBoards'


const CreatePin = () => {
    const { currentUser, token } = useContext(AuthContext);
    const API = apiURL();
    const [userId, setUserId] = useState("");
    const [newPin, setNewPin] = useState("")
    const setBoard = useInput("");
    const setTag = useInput("");
    const setNote = useInput("");
    const history = useHistory("");

// for image preview usig dropzone 
// keeping track of the image aka files
    const [files, setFiles] = useState([]);



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



    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          )
        },
      })
    
      const images = files.map((file) => (
        <div key={file.name}>
          <div>
            <img src={file.preview} style={{ width: "300px"}} alt="preview" />
          </div>
        </div>
      ))


    const onImageUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        let newPin = await axios.post(`${API}/api/uploads/`,formData,config)
        // console.log(newPost.data)
        setNewPin(newPin);
        history.push("/user-feed")
        if(newPin.data.status === "success") {
          setImagePath(newPin.data.payload);
          alert("Yaaaah image is successfully uploaded")
          setFile("")
        } else {
            alert(`${newPin.status.message}`)
        }

    }

    const checkMimeType =(e)=>{
      let files = e.target.files 
      let err = ''
     const types = ['image/png', 'image/jpeg', 'image/gif']
      for(let x = 0; x<files.length; x++) {
           if (types.every(type => files[x].type !== type)) {
           err += files[x].type+' is not a supported format\n';
         }
       };
     if (err !== '') { 
          e.target.value = null
          alert(err)
           return false; 
      }
     return true;
    }

      const onSelectImage=(e)=> {
        if(checkMimeType(e)){
            setFile(e.target.files[0]);
        }
    }
    



    const handleNewPins = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append("creator_id", userId);
            formData.append("board_id", setBoard.value)
            formData.append("note", setNote.value);
            debugger

            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }
            let newPin = await axios.post(`${API}/api/pins`, formData, config);
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
    //         history.push("/user-feed")
    //     } catch (err) {
    //         toast(err)
    //     }
    // }
    // --------------------------------------------------------------------------------------------

    // const handleNewPin = async () => {
    //     try {
    //         let newPin = await axios.post(`${API}/api/pins/`,{formData, config});
    //         // setPin(newPin)
    //         handleNewTag(newPin.data.payload)
    //         // console.log(newPin.data)
    //         // handleNewTag(newPin.data.payload)
    //         toast(`Successfully saved to @boardName`)
    //         history.push("/user-feed")
    //     } catch (err) {
    //        toast(err)
    //     }
    // }

    // const handleNewTag = async (data)=>{
    //     if(setTag.value){
    //         let newTag = await axios.post(`${API}/api/hashtags/`, {formData, config});
    //         console.log(newTag.data)
    //     } else {
    //         console.log("No tag was added")
    //     }
    // }

    // const handleNewBoard = async () => {
    //     try {
    //         let newPin = await axios.post(`${API}/api/boards/`,{creator_id:sessionStorage.loginedUser, imageURL:imagePath, content:setNote.value})
    //         console.log(newPin.data)
    //         handleNewTag(newPin.data.payload)
    //         toast(`Saved to @boardName`)
    //     } catch (err) {
    //         toast(err)
    //     }
    // }

    
    



    
    return (
        <div className="create-pin-div"> 

            <form onSubmit={onImageUpload} className="create-pin-main-div"> 
                <div className="drop-down-div">
                    {/* drop down bar for Boards with save button */}
                    {/* <select className="board-select-options" onChange={handleBoards}>
                            <option defaultValue="Select"> Select </option>
                            {selectOptions}
                    </select> */}
                    {/* <PopulateBoards/> */}
                    <button className="save-button-style" type="submit" onClick={handleNewPins}> Save </button>

                </div>

                <div className="uploadImageDiv"> 


                    <div {...getRootProps()} className="image-preview" id="imagePreview"> 
                        <img src="" alt="Preview" className="image-preview__image"/> 
                        <input type="file" name="myImage" accept="image/png" onChange={onSelectImage} {...getInputProps()}/>
                        <span className="image-preview__default-text"> Drag and drop or click to upload</span> 
                    </div>
                    {/* <input type="submit" value="Upload!" className="file-upload-button"/> */}
                    <div>{images}</div>
                    

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

            {/* <div>
                <ul className="showing-pin"> 
                    {showPin} 
                </ul>
            </div> */}

        </div>
    )
}

export default CreatePin;