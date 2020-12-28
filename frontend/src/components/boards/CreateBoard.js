import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { apiURL } from "../../util/apiURL";
import { useInput } from '../../util/useInput';
import { AuthContext } from '../../providers/AuthProvider';
import '../../css/CreateBoard.css';
import { storage } from "../../firebase";


const CreateBoard = () => {
    const boardName = useInput("");
    const boardDescription = useInput("");
    let hashtagObj = useInput("");
    
    const API = apiURL();
    const [userId, setUserId] = useState("");
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const { currentUser, token } = useContext(AuthContext);
    const [file, setFile] = useState({preview: "", raw: ""});
    const [imageAsFile, setImageAsFile] = useState("");
    const [imageAsUrl, setImageAsUrl] = useState("");



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

    
    // const handleImagePreview = async (e) => {
    //     if (e.target.files.length) {
    //         setFile({
    //             preview: URL.createObjectURL(e.target.files[0]),
    //             raw: e.target.files[0]
    //         });
    //     }
    // }


    const handleUpload = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`boards/${imageAsFile.name}`).put(imageAsFile);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log("Upload is " + progress + "% done");
                console.log(snapshot);
                setProgress(progress);
            },
            error => {
                console.log(error);
            },
            () => {        
                storage
                .ref("boards")
                .child(imageAsFile.name)
                .getDownloadURL()
                .then((fireBaseUrl) => {
                    setImageAsUrl(fireBaseUrl);
                });
        })
    }


    const createBoard = async (e) => {
        e.preventDefault();
        try {
            debugger
            let res = await axios({
                method: "post",
                url: `${API}/api/boards/`,
                data: {
                    'creator_id': userId, 
                    'board_name': boardName.value,
                    'board_description': boardDescription.value,
                    'board_image': imageAsUrl,
                },
                headers: {
                    'AuthToken': token,
                    'Content-Type': 'application/json'
                },
            });
            debugger
            handleUpload(e)
            console.log(res.data.payload);
            setTimeout(function() {
                window.location = "/user-profile/boards";
                },1000) 
        } catch(error) {
            // setFile([]);
        }
    }


    // const onSelectImage = (e) => {
    //     if (e.target.files.length) {
    //         setFile({
    //           preview: URL.createObjectURL(e.target.files[0]),
    //           raw: e.target.files[0]
    //         });
    //       }
    // }

    //             const handleNewBoards = async (e) => {
    //                 try {
    //                     e.preventDefault();
    //                     const formData = new FormData();
    //                     formData.append("myImage", file.raw);
    //                     formData.append("file", file.preview);
    //                     formData.append("board_name", boardName.value);
    //                     formData.append("board_description", boardDescription.value);
    //                     formData.append("creator_id", userId);
    //                     debugger
    //         const config = {
    //             headers: {
    //                 "content-type": "multipart/form-data",
    //             },
    //         }
    //         let newBoard = await axios.post(`${API}/api/boards/`, formData, config)
    //         console.log(newBoard.data)
    //         console.log("New board was created")
    //         setTimeout(function() {
    //         window.location = "/user-profile/boards";
    //         },1000) 
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    const handleNewHashTag = async(data)=>{
        if(hashtagObj.value){
            let newHashTag = await axios.post(`http://localhost:3005/api/tags/`,{creator_id:data.creator_id, pin_id:data.id,tag_name:hashtagObj.value})
            console.log(newHashTag.data)
        }else{
            console.log("No hashtag was added")
        }
    }

    return (
        <div className="create-board-div">

            <div className="helloHeader2">
                <h2 className="welcome-to-create-board"> CREATE YOUR BOARD</h2>
            </div>


            <div className="create-board-form-div">
                <form className="create-board-main-div" onSubmit={createBoard}>

                    <div className="uploadImageDiv2"> 
                        <div className="image-preview2" id="imagePreview">  
                            <label for="file-upload" class="custom-file-upload" style={{textAlign:"center", marginBottom:"10%", fontVariant:"small-caps", fontWeight:"800", fontSize:"20px"}}>
                                Click to Upload
                            </label>
                            <input className="image-preview-view" id="file-upload" type="file" name="myImage" accept="image/png/jpeg" onChange={handleImageAsFile}/>
                            <img id="blah" alt=" " className="image-preview__image" src={file.preview}/>
                        </div>
                    </div>

                    <div className="main-note-for-board-div">
                        <div className="another-div-wow">

                            <div className="create-board-btn-div">
                                <button className="save-button-style" type="submit"> Save </button>
                            </div>

                            <div className="style-for-name-div form__group field">
                                <input id="board-title" className="board-name-place" class="form__field" placeholder="Board Title" {...boardName} required/>
                                <label for="board-title" class="form__label_BT"> Board Title </label>
                            </div>

            
                        
                            <div className="descrip-div form__group field">
                                <textarea id="board-title" class="form__field" style={{height:"270px", width:"270px", marginTop:"50px"}} className="board-description-place" placeholder="Tell everyone what your board is about..." {...boardDescription} required/>
                                <label for="board-title" class="form__label_BT_two"> What's your board about? </label>
                            </div>
                        </div>
                    </div> 

                </form>
            </div>
        </div>
    )
}

export default CreateBoard;