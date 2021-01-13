import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { apiURL } from '../../../util/apiURL';
import { useInput } from '../../../util/useInput';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import PopulateBoards from '../../boards/PopulateBoards'
import '../../../css/CreatePin.css';
import { storage } from "../../../firebase";


const CreatePin = () => {
    const { currentUser, token } = useContext(AuthContext);
    const API = apiURL();
    const history = useHistory();

    const [userId, setUserId] = useState("");
    const [boardId, setBoardId] = useState("");
    const [newPins, setNewPins] = useState([]);
    const setTag = useInput("");
    const setNote = useInput("");

// uploading image
    const [file, setFile] = useState({preview: "", raw: ""});
    const [fileName, setFileName] = useState("");
    const [imageAsUrl, setImageAsUrl] = useState("");
    const [imageAsFile, setImageAsFile] = useState("");

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

//   const onSelectImage = (e) => {
//     if (e.target.files.length) {
//         setFile({
//           preview: URL.createObjectURL(e.target.files[0]),
//           raw: e.target.files[0]
//         });
//       }
// }

const handleImageAsFile = (e) => {
        const image = e.target.files[0];
        const types = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
        if (types.every((type) => image.type !== type)) {
          alert(`${image.type} is not a supported format`);
        } else {
          setImageAsFile((imageFile) => image);
        }
        if (e.target.files.length) {
            setFile({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
      };

    const handleUpload = () => {
    // if (file.raw === "") {
    //   alert("Please choose a valid file before uploading");
    // } else if (file.raw !== null) {
    // debugger
        return new Promise((resolve, reject) => {
            const uploadTask = storage.ref(`/pins/${file.raw.name}`).put(file.raw);
            uploadTask.on(
                "state_changed",
                (snapShot) => {
                    console.log(snapShot);
                },
                (err) => {
                    console.log(err);
                    reject(err)
                },
                () => {
                        storage
                        .ref("pins")
                        .child(file.raw.name)
                        .getDownloadURL()
                        .then((fireBaseUrl) => {
                            resolve(fireBaseUrl);
                        }) 
                        .catch((err)=> {
                            reject(err)
                        });
                }
            );
    })
}
    // const handleNewPins = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const formData = new FormData();
    //         formData.append("myImage", file.raw);
    //         formData.append("file", file.preview);
    //         formData.append("creator_id", userId);
    //         formData.append("board_id", boardId);
    //         formData.append("note", setNote.value);
    //         formData.append("tag_name", setTag.value);
    //         const config = {
    //           headers: {
    //             "content-type": "multipart/form-data",
    //           },
    //         }
    //         let newPin = await axios.post(`${API}/api/pins/`, formData, config);
    //         console.log(newPin.data)
    //         handleNewTag(newPin.data.post)
    //         history.push("/user-feed");
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    const createPin = async (e) => {
        e.preventDefault();
        try {
            let fireBaseUrl = await handleUpload(e);
            let res = await axios({
                method: "post",
                url: `${API}/api/pins/`,
                headers: {
                    'AuthToken': token,
                    'Content-Type': 'application/json'
                },
                data: {
                    'creator_id': userId, 
                    'board_id': boardId,
                    'note': setNote.value,
                    'imageUrl': fireBaseUrl,
                    'tag_name': setTag.value,
                },
            });
            console.log(res.data);
            handleNewTag(res.data.payload)	            
            console.log("New pin was created")	            
            history.push("/user-feed");	
        } catch(error) {
        }
    }


    const handleNewTag = async(data) => {
        if(setTag.value){
            // split setTag.value with comma
            let tagsArr = setTag.value.split(", ");
            tagsArr.forEach(async (el)  => {
                let newTag = await axios.post(`${API}/api/tags/`, {
                creator_id: data.creator_id, 
                pin_id:data.id, 
                board_id:data.board_id, 
                // grabbing the val of all the tags (looped)
                tag_name:el });
                // tag_name:setTag.value}); old way (solo)) 
            })
        } else {
            console.log("No hashtag was added")
        }
    }


//  ----------------------------------------------------------------------------------------
    
    return (
        <div className="create-pin-div"> 

            <div className="helloHeader">
                <h2 className="welcome-to-create-pin"> CREATE YOUR PIN</h2>
            </div>

            <div className="create-pin-form-div">
                <form className="create-pin-main-div" onSubmit={createPin}> 
                    <div className="drop-down-div">
                    </div>

                    <div className="uploadImageDiv">
                        <div className="image-preview" id="imagePreview"> 
                            {/* <button className="save-button-style" type="submit"> Save </button> */}
                            <label for="file-upload" class="custom-file-upload-two" style={{textAlign:"center", marginBottom:"10%", fontVariant:"small-caps", fontWeight:"800", fontSize:"20px"}}>
                                    Click to Upload
                            </label>
                            <input className="image-style-yeah-cp" id="file-upload" type="file" name="myImage" accept="image/png/jpeg" onChange={handleImageAsFile} />
                            <img id="blah" alt=" " src={file.preview} className="image-preview__image"/> 
                        </div>
                    </div>


                    <div className="main-note-for-pin-div"> 
                        <div className="another-div-wow-two">

                            <div className="create-pin-btn-div">
                                <button className="save-button-style" type="submit"> Save </button>
                            </div>

                            <div className="choose-board"> 
                                <PopulateBoards boardId={boardId} setBoardId={setBoardId}/>
                                {/* passing the props child/parent */}
                            </div>

            
                        
                            <div className="user-display">
                                {/* {user} */}
                            </div>

                            <div className="about-div form__group field"> 
                                <textarea id="pin-about" class="form__field" style={{height:"200px", width:"270px", marginTop:"50px", paddingTop:"5px", paddingRight:"5px", paddingLeft:"5px"}} className="add-note-style" type="textarea" placeholder="Tell everyone what your Pin is about" {...setNote}/> 
                                <label for="pin-about" class="form__label_BT_two"> Tell us more </label>
                            </div>


                            <div className="style-for-tagname-div form__group field">
                                    <input id="hashtag-title" className="style-hashtag-input" class="form__field" type="text" placeholder="Add some hashtags..." {...setTag} />
                                    <label for="hashtag-title" class="form__label_BT"> Add Hashtags </label>
                            </div>

                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CreatePin;