import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { apiURL } from "../util/apiURL";
import { useInput } from '../util/useInput';

import { AuthContext } from '../providers/AuthProvider';
import { useHistory } from 'react-router-dom';

import DropArea from '../util/usePreview'

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


    const [data, setData] = useState(false);
        const [err, setErr] = useState(false)

    // uploading image
    const [file, setFile] = useState({preview: "", raw: ""});
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
        if (e.target.files.length) {
            setFile({
              preview: URL.createObjectURL(e.target.files[0]),
              raw: e.target.files[0]
            });
          }
    }
    
    
    // const showPreview = (e) => {
    //     e.preventDefault();
    //     const {
    //     dataTransfer: { files }
    //     } = e;
    //     console.log("Files: ", files);
    //     const { length } = files;
    //     const reader = new FileReader();
    //     if (length === 0) {
    //     return false;
    //     }
    //     const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    //     const { size, type } = files[0];
    //     setData(false);
    //     if (!fileTypes.includes(type)) {
    //     setErr("File format must be either png or jpg");
    //     return false;
    //     }
    //     if (size / 1024 / 1024 > 2) {
    //     setErr("File size exceeded the limit of 2MB");
    //     return false;
    //     }
    //     setErr(false);

    //     reader.readAsDataURL(files[0]);
    //     reader.onload = loadEvt => {
    //     setData(loadEvt.target.result);
    //     };
  
    // const onDragStart = e => {
    //     e.preventDefault();
    // };
    // const onDragOver = e => {
    //     e.preventDefault();
    // };
            // let file = e.currentTarget.files[0];
            // setBoardImagePath(file);
            // let fileReader = new FileReader();
            // fileReader.onloadend = () => {
            //     setBoardImagePath(fileReader.result)
            //     };
            //     if(file) {
            //             fileReader.readAsDataURL(file);
            //         }
            // let file = e.currentTarget.files[0];
            // let fileReader = new FileReader();
            // fileReader.onloadend = () => {
            //   this.setState({ imageFile: file, imageUrl: fileReader.result });
            // };
            // if (file) {
            //   fileReader.readAsDataURL(file);
            // }



            // 
                // };



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
        <div className="board-page">
            <div className="create-board-form">
                    <div className="image-preview" id="imagePreview">  
                        <span className="image-preview__default-text"> Create A Board </span> 
                        <img src="" alt="Image Preview" className="image-preview__image" src={file.preview}/>
                    </div>
                <form onSubmit={handleNewBoards} className="create-board-form">

                    <input className="board-name-place" placeholder="Board name" {...boardName}/>
                    <br/>
                    <textarea className="board-description-place" placeholder="Board description" {...boardDescription}/>


                    <input className="image-preview-view" type="file" name="myImage" accept="image/png/jpeg" onChange={onSelectImage}/>

                <div>
                    {/* <img src={files} alt="Preview" className="image-preview__image"/>  */}
                    {/* {images} */}
                </div> 
                    <button type="submit"> Save </button>
                    <br/>
                    
                </form>
            </div>



             


            

        </div>
    )


}

export default CreateBoard;