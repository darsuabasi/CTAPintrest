import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { apiURL } from "../util/apiURL";
import { useInput } from '../util/useInput';

import { AuthContext } from '../providers/AuthProvider';
import { useHistory } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import '../css/CreateBoard.css'


const CreateBoard = () => {
    const [userId, setUserId] = useState("");
    const { currentUser, token } = useContext(AuthContext);
    const API = apiURL();
    let hashtagObj=useInput("")
    const boardName = useInput("");
    const boardDescription = useInput("");
    const [board, setBoard] = useState([]);
    // for image preview usig dropzone 
    // keeping track of the image aka files
    const [files, setFiles] = useState([]);


    const history = useHistory("");

    // uploading image
    const [file, setFile] = useState('');
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



    const onUploadImage = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("myImage", file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        let res = await axios.post(`${API}/api/uploads`, formData, config)
        debugger
        setBoard(res);
        history.push("/user-profile/boards")
        // debugger
        if(res.data.status==="success"){
            setBoardImagePath();
            alert("Image is successfully uploaded")
            setFile("")
        } else {
            alert(`${res.data.message}`)
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
            // handleNewHashTag(newPost.data.payload)
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
            console.log("No Hash_Tag was added")
        }
    }

    return (
        <div className="board-page">


            <div className="uploadImageDiv"> 
                {/* <h2 className="welcome-create-board"> Create a board</h2>  */}
                
                <div {...getRootProps()} className="image-preview" id="imagePreview"> 
                    <img src="" alt="Preview" className="image-preview__image"/> 
                    <input className="image-preview-view" type="file" name="myImage" accept="image/png" onChange={onSelectImage} {...getInputProps()}/>
                    <span className="image-preview__default-text"> Drag + drop or click to upload a board image</span> 
                </div>
                    {/* <input type="submit" value="Upload!" className="file-upload-button"/> */}
                <div>
                    {images}
                </div> 
            </div>

            <div className="create-board-form">
                <form onSubmit={onUploadImage} className="create-board-form">

                    {/* <div {...getRootProps()} className="image-preview" id="imagePreview"> 
                        <img src="" alt="Preview" className="image-preview__image"/> 
                        <input className="image-preview-view" type="file" name="myImage" accept="image/png" onChange={onSelectImage} {...getInputProps()}/>
                        <span className="image-preview__default-text"> Drag and drop or click to upload</span> 
                    </div> */}
                    {/* <input type="submit" value="Upload!" className="file-upload-button"/> */}
                    {/* <div>
                        {images}
                    </div> */}



                    <input className="board-name-place" placeholder="Board name" {...boardName}/>
                    <br/>
                    <textarea className="board-description-place" placeholder="Board description" {...boardDescription} />
                    {/* <input type="file"/> */}
                    <br/>
                    <button onClick={handleNewBoards}> Save </button>
                    
                </form>
            </div>

            {/* <div className="uploadImageDiv"> 
                <div {...getRootProps()} className="image-preview" id="imagePreview"> 
                    <img src="" alt="Preview" className="image-preview__image"/> 
                    <input type="file" name="myImage" accept="image/png" onChange={onSelectImage} {...getInputProps()}/>
                    <span className="image-preview__default-text"> Drag and drop or click to upload</span> 
                </div>
                    <input type="submit" value="Upload!" className="file-upload-button"/>
                <div>
                    {images}
                </div>
            </div>   */}




             


            

        </div>
    )


}

export default CreateBoard;